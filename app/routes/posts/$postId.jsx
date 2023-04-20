import { Link, useLoaderData } from '@remix-run/react';
import { redirect } from '@remix-run/server-runtime';

import { db } from '~/utils/db.server';

export const loader = async ({ params }) => {
	const post = await db.post.findUnique({
		where: { id: params.postId },
	});

	if (!post) throw new Error('Post not found');

	const data = { post };

	return data;
};

export const action = async ({ request, params }) => {
	const form = await request.formData();
	if (form.get('_method') === 'delete') {
		const post = await db.post.findUnique({
			where: { id: params.postId },
		});

		if (!post) throw new Error('Post not found');

		await db.post.delete({ where: { id: params.postId } });


		return redirect('/posts');
	}
};

export default function Post() {
	const { post } = useLoaderData();

	return (
		<div>
			<div className='page-header'>
				<h1>Post {post.title}</h1>
				<Link to='/posts' className='btn btn-reverse'>
					Back
				</Link>
			</div>
			<div className='page-content'>
				<p>{post.body}</p>
			</div>

			<div className='page-footer'>
				<form method='post'>
					<input type='hidden' name='_method' value='delete' />
					<button className='btn btn-delete'>Delete</button>
				</form>
			</div>
		</div>
	);
}
