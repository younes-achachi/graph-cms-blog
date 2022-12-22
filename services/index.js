import { request, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						authors {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;
	const results = await request(graphqlAPI, query).then((data) => data);
	return results.postsConnection.edges;
};

export const getPostsByCategory = async (slug) => {
	const query = gql`
		query 
			getPostsByCategory($slug:String!){
			postsConnection(where: {categories_every: {slug: $slug}}) {
				edges {
					node (){
						authors {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;
	const results = await request(graphqlAPI, query, { slug: slug }).then((data) => data);
	return results.postsConnection.edges;
};
export const getPostDetails = async (slug) => {
	console.log('a console log reauquest ');

	const query = gql`
		query getPostDetails($slug: String!) {
			posts(where: { slug: $slug }) {
				authors {
					bio
					name
					id
					photo {
						url
					}
				}
				createdAt
				slug
				title
				excerpt
				content {
					raw
				}
				featuredImage {
					url
				}
				categories {
					name
					slug
				}
			}
		}
	`;
	const results = await request(graphqlAPI, query, { slug: slug }).then((data) => data);

	return results.posts;
};

export const getRecentPost = async () => {
	const query = gql`
    query GetPostDetails(){
        posts(
            orderBy: createdAt_ASC
            last:3
            ){
            title
            featuredImage{
               url
            }
            createdAt
            slug

        }
     }
    
    `;

	const result = await request(graphqlAPI, query).then((res) => res);
	return result.posts;
};
export const getSimilarPosts = async (slug, categories) => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!] = ["tech"]) {
			posts(where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }, last: 3) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;
	const result = await request(graphqlAPI, query, { slug, categories }).then((data) => data);
	console.log(result, 'request 2');
	return result.posts;
};

export const getCategories = async () => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`;
	const result = await request(graphqlAPI, query).then((res) => res);
	return result.categories;
};

export const submitComment = async (obj) => {
	console.log('submiteComment fire');
	const result = await fetch('/api/comments', {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json; charset=utf8'
		},
		body: JSON.stringify(obj)
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((data) => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	console.log(JSON.stringify(obj));
	return result;
};

export const getComments = async (slug) => {
	const query = gql`
		query getComments($slug: String!) {
			comments(where: { post: { slug: $slug } }) {
				createdBy {
					name
				}
				createdAt
				comment
				name
			}
		}
	`;
	const result = await request(graphqlAPI, query, { slug }).then((res) => res);
	return result;
};

export const getFeaturedPosts = async () => {
	const query = gql`
	  query GetCategoryPost() {
		posts(where: {featured: true}) {
		  authors {
			name
			photo {
			  url
			}
		  }
		  featuredImage {
			url
		  }
		  title
		  slug
		  createdAt
		}
	  }   
	`;

	const result = await request(graphqlAPI, query);

	return result.posts;
};
