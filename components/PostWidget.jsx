import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPost, getSimilarPosts } from '../services';
const PostWidget = ({ slug, categories }) => {
	console.log(slug, categories, 'reqauest 4 ');
	const [ relatedPost, setRelatedPost ] = useState([]);
	useEffect(
		() => {
			if (slug) {
				getSimilarPosts(slug, categories).then((data) => {
					setRelatedPost(data);
					console.log(data, 'returned data postwidget.........///////');
				});
			} else {
				getRecentPost().then((data) => setRelatedPost(data));
			}
			console.log(relatedPost);
		},
		[ slug ]
	);
	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
			<h3 className="font-semibold text-xl mb-8 border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
			{relatedPost.map((post, index) => {
				return (
					<div key={index} className="flex items-center w-full mb-4">
						<div className="w-16 flex-none">
							<img
								alt={post.title}
								height="60px"
								width="60px"
								className="align-middle rounded-full"
								src={post.featuredImage.url}
							/>
						</div>
						<div className="flex-grow ml-4">
							<p className="text-gray-500 font-xs">{moment(post.createdAt).format('lll')}</p>
							<Link href={`/post/${post.slug}`} key={post.title} className="text-md">
								{post.title}
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
};
export default PostWidget;
