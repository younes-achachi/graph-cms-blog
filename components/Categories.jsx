import React, { useState, useEffect } from 'react';
import { getCategories } from '../services';
import Link from 'next/link';
export default function Categories() {
	const [ categories, setCategories ] = useState([]);
	useEffect(() => {
		getCategories().then((res) => setCategories(res));
	}, []);

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
			<h3 className="font-semibold text-xl mb-8 border-b pb-4">Categories</h3>
			{categories.map((category) => {
				return (
					<Link key={category.slug} href={`/category/${category.slug}`}>
						<span className="cursor-pointer block pb-3	mb-3">{category.name}</span>
					</Link>
				);
			})}
		</div>
	);
}
