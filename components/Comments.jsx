import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getComments } from '../services';
const Comments = ({ slug }) => {
	console.log(slug, 'the slug');

	const [ comments, setComments ] = useState([]);
	useEffect(
		() => {
			getComments(slug).then((res) => setComments(res.comments));
			console.log(comments.length, 'comment length');
		},
		[ slug ]
	);
	return (
		<React.Fragment>
			{comments.length > 0 && (
				<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
					<h3 className="test-xl mb-8 font-semibold border-b  pb-4 ">{comments.length} Comments : </h3>
					{comments.map((e, i) => {
						return (
							<div key={i} className="border-b border-gray-100 mb-4 pb-4">
								<p className="mb-4">
									<span className="font-semibold">
										{e.name[0].toUpperCase().concat(e.name.slice(1))}
									</span>{' '}
									on {moment(e.creactedAt).format('lll')}
								</p>
								<p className="whitespace-pre-line text-gray-600 w-full">{e.comment}</p>
							</div>
						);
					})}
				</div>
			)}
		</React.Fragment>
	);
};
export default Comments;
