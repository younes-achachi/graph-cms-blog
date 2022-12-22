import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { PostCard, Categories, PostWidget } from '../../components';
import { getCategories, getPosts, getPostsByCategory } from '../../services';
import { FeaturedPosts } from '../../sections';

export default function Home({ posts }) {
	return (
		<div className=" container mx-auto px-10 mb-8 ">
			<Head>
				<title> CMs Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-gray-400 bg-opacity-[0.45]">
				<div className="lg:col-span-8 col-span-1">
					{posts.map((post, index) => {
						return <PostCard post={post.node} key={index} />;
					})}
				</div>
				<div className="lg:col-span-4 col-span-1">
					<div className="lg:sticky relative top-8" />
					<PostWidget />
					<Categories />
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const categories = await getCategories();
	console.log(categories, 'categoriessss');
	return {
		paths: categories.map((e) => {
			return { params: { category: e.slug } };
		}),
		fallback: false
	};
}
export async function getStaticProps({ params }) {
	const posts = (await getPostsByCategory(params.category)) || [];
	console.log(posts);
	return {
		props: { posts }
	};
}
