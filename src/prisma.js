//File to connect NodeJS with Prisma

import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: 'ariel',
	fragmentReplacements
})



export { prisma as default }

// const createPostForUser = async (authorId, data) => {
// 	const userExists = await prisma.exists.User({ id: authorId })

// 	if (!userExists) throw new Error('User not found');

// 	const post = await prisma.mutation.createPost({
// 		data: {
// 			...data,
// 			author: {
// 				connect: {
// 					id: authorId
// 				}
// 			}
// 		}
// 	}, '{author {id name email posts{id title published}}}')
// 	//const user = await prisma.query.user({ where: { id: authorId } }, '{id name email posts{id title}}')
// 	return post.author;
// }

// const updatePostForUser = async (postId, data) => {
// 	const postExists = await prisma.exists.Post({ id: postId });

// 	if (!postExists) throw new Error('Post not found');

// 	const updatedPost = await prisma.mutation.updatePost({
// 		where: { id: postId }, data: {
// 			...data
// 		}
// 	}, '{author {id name email posts{id title published}}}')
// 	//const user = await prisma.query.user({ where: { id: updatedPost.author.id } }, '{id name posts{title}}')
// 	return updatedPost.author
// }

// updatePostForUser('ck7cnk5ix00yl08951bkexbzk', {
// 	title: 'Batman Return Again',
// 	published: false
// }).then((user) => {
// 	console.log(JSON.stringify(user, undefined, 2))
// }).catch(e => console.log(e))

// createPostForUser('ck7can0ji05fw0795pcpex3ku', {
// 	title: 'Green Lanterm',
// 	body: 'A movie by Ryan Reynolds',
// 	published: false
// }).then((user) => {
// 	console.log(JSON.stringify(user, undefined, 2))
// }).catch(e => console.log(e))

// prisma.mutation.createAuthor({
// 	data: {
// 		authorname: "David",
// 		email: "d@d.com",
// 		age: 45
// 	}
// }, '{id authorname}').then((author) => {
// 	console.log(author)
// 	return prisma.query.authors(null, '{id authorname}')
// }).then((data) => {
// 	console.log(data)
// }).catch(e => e)

// prisma.mutation.createProduct({
// 	data: {
// 		productname: "Water Bottle",
// 		desc: "Water Bottle",
// 		published: false,
// 		author: {
// 			connect: {
// 				id: "ck7dj59wx01g00795ivbdl9l1"
// 			}
// 		}
// 	}
// }, '{id productname desc published}').then((data) => {
// 	console.log(data)
// 	return prisma.query.authors(null, '{id authorname products{productname}}')
// }).then((authordata) => {
// 	console.log(JSON.stringify(authordata, undefined, 2))
// }).catch(e => console.log(e))

// prisma.mutation.createComment({
// 	data: {
// 		body: "Nice work. Excellent design",
// 		product: {
// 			connect: {
// 				id: "ck7dkadop01nf0795isrvrc07"
// 			}
// 		},
// 		auhtor: {
// 			connect: {
// 				id: "ck7dy606p000f0795neczdjr2"
// 			}
// 		}
// 	}
// }, '{body}').then((product) => {
// 	console.log(product)
// 	return prisma.query.comments(null, '{id body}')
// }).then((commentdata) => {
// 	console.log(JSON.stringify(commentdata, undefined, 2))
// }).catch(e => e)

// prisma.mutation.updatePost({
// 	data: {
// 		title: "Iron Man 3",
// 		published: false,
// 	},
// 	where: {
// 		id: "ck7ckkz3z00nf0895yw917cj2"
// 	}
// }, '{id title published}').then((updatepost) => {
// 	console.log(updatepost)
// 	return prisma.query.posts(null, '{id title body published}')
// }).then((postdata) => {
// 	console.log(JSON.stringify(postdata, undefined, 2))
// })
// 	.catch(e => console.log(e))