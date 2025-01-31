'use client';

import { useTransition } from 'react';
import { deletePost } from '../actions/posts';

export default function DeleteButton({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      const formData = new FormData();
      formData.append('postId', postId.toString());
      
      startTransition(() => {
        deletePost(formData);
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
