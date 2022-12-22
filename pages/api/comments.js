// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const submitComment = async (req, res) => {
	console.log(req.body);

	const graphQLClient = new GraphQLClient(graphqlAPI, {
		headers: { authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}` }
	});
	const query = gql`
		mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
			createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) {
				id
			}
		}
	`;
	const queryPublish = gql`
		mutation publish($id: ID!) {
			publishComment(where: { id: $id }) {
				comment
				name
				id
			}
		}
	`;

	try {
		const result = await graphQLClient.request(query, req.body).then((data) => data);
		console.log('the result fdddddddddddddddddkdkdkdkdkdkdkdk', result);
		const publish = setTimeout(
			async () => await graphQLClient.request(queryPublish, { id: result.createComment.id }).then((data) => data),
			3000
		);
		console.log(publish);
		return res.status(200).send(result, 'the result');
	} catch (e) {
		return res.status(500).send(e);
	}
};
// export function getServerSideProps() {
// 	return {
// 		props: {
// 			req: {
// 				body: { name: 'asdf', email: 'asdf', comment: 'kkk', slug: 'react-testing' }
// 			}
// 		}
// 	};
// }

export default submitComment;
