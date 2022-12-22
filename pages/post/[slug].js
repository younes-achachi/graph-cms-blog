import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPosts, getPostDetails } from '../../services';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';

const PostDetails = ({ post }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Loader />;
	}

	console.log(post.categories[0], 'reuqest 3 .........................///////');
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					<PostDetail post={post} />
					<Author author={post.authors[0]} />
					<CommentsForm slug={post.slug} />
					<Comments slug={post.slug} />
				</div>
				<div className="col-span-1 lg:col-span-4">
					<div className="relative lg:sticky top-8">
						<PostWidget slug={post.slug} categories={post.categories.map((e, i) => e.slug)} />
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
};
export default PostDetails;
export async function getStaticPaths() {
	const posts = await getPosts();
	return {
		paths: posts.map(({ node: { slug } }) => {
			return { params: { slug } };
		}),
		fallback: true
	};
}
export async function getStaticProps({ params }) {
	const data = await getPostDetails(params.slug);
	// console.log(data, 'request 1');
	return {
		props: {
			post: data[0]
		}
	};
}
