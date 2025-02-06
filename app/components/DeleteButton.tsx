'use client';

import { useTransition } from 'react';
import { deletePgPost } from '../actions/pgPosts';

export default function DeleteButton({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      startTransition(async () => {
        const result = await deletePgPost(postId);
        if (result.error) {
          alert(result.error);
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 disabled:text-red-300"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
