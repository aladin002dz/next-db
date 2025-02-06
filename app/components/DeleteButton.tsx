'use client';

import { useState, useTransition } from 'react';
import { deletePost } from '../actions/posts';

export default function DeleteButton({ postId }: { postId: number }) {
	const [isPending, startTransition] = useTransition();
	const [confirmModal, setConfirmModal] = useState(false);

	const handleDelete = () => {
		const formData = new FormData();
		formData.append('postId', postId.toString());

		startTransition(() => {
			deletePost(formData);
		});
	};

	return (
		<div>
			<button
				onClick={() => setConfirmModal(true)}
				className='text-red-500 hover:text-red-700 disabled:text-red-300'>
				Delete
			</button>
			{confirmModal && (
				<div className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black/30'>
					<div className='flex flex-col gap-6 p-4 bg-white border rounded-md'>
						<p className='text-black'>Are you sure you want to delete this post?</p>
						<button
							onClick={handleDelete}
							disabled={isPending}
							className='py-2 text-white bg-red-500 hover:bg-red-700 disabled:text-red-300 rounded-md'>
							{isPending ? 'Deleting...' : 'Delete'}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
