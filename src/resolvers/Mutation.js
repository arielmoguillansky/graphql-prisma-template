import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'
import hashPassword from '../utils/hashPassword'

const Mutation = {
	async loginAuthor(parent, args, { prisma }, info) {

		const author = await prisma.query.author({
			where: {
				email: args.email
			}
		})

		if (!author) throw new Error('Invalid email')

		const isMatch = await bcrypt.compare(args.password, author.password)

		if (!isMatch) throw new Error('Invalid password')

		return { author, token: jwt.sign({ authorId: author.id }, process.env.JWT_SECRET, { expiresIn: '1 day' }) }
	},

	async	createAuthor(parent, args, { prisma }, info) {
		const hashpass = await hashPassword(args.password)

		const emailTaken = await prisma.exists.Author({ email: args.email })

		if (emailTaken) throw new Error('Email in use')

		const author = await prisma.mutation.createAuthor({
			data: {
				...args,
				password: hashpass
			}
		})

		return { author, token: jwt.sign({ authorId: author.id }, process.env.JWT_SECRET, { expiresIn: '1 day' }) }

	},
	async createProduct(parent, args, { prisma, request }, info) {
		const authorId = getUserId(request)

		const authorExists = await prisma.exists.Author({ id: args.authorId })

		if (!authorExists) throw new Error('User not found')

		const product = await prisma.mutation.createProduct({
			data: {
				productname: args.productname,
				published: args.published,
				desc: args.desc,
				author: {
					connect: {
						id: authorId
					}
				}
			}
		}, info)

		return product
	},
	async createComment(parent, args, { prisma, request }, info) {
		const authorId = getUserId(request)
		const authorExists = await prisma.exists.Author({ id: authorId })
		const productExists = await prisma.exists.Product({ id: args.productId, published: true })

		if (!authorExists) throw new Error('User not found')
		if (!productExists) throw new Error('Product not found')

		const comment = await prisma.mutation.createComment({
			data: {
				body: args.body,
				author: {
					connect: {
						id: authorId
					}
				},
				product: {
					connect: {
						id: args.productId
					}
				}
			}
		}, info)
		return comment
	},
	async deleteAuthor(parent, { id }, { prisma, request }, info) {
		const authorId = getUserId(request)
		const authorExists = await prisma.exists.Author({ id })

		if (!authorExists) throw new Error('Author not found')

		const deletedAuthor = await prisma.mutation.deleteAuthor({
			where: {
				id: authorId
			}
		}, info)

		return deletedAuthor

	},
	async deleteProduct(parent, { id }, { prisma, request }, info) {
		const authorId = getUserId(request)
		const productExists = await prisma.exists.Product({
			id,
			author: {
				id: authorId
			}
		})

		if (!productExists) throw new Error('Product not found')

		const deletedProduct = await prisma.mutation.deleteProduct({
			where: { id }
		}, info)
		return deletedProduct;
	},
	async deleteComment(parent, { id }, { prisma, request }, info) {
		const authorId = getUserId(request)
		const commentExists = await prisma.exists.Comment({
			id,
			author: {
				id: authorId
			}
		})

		if (!commentExists) throw new Error('Comment not found')

		const deletedComment = await prisma.mutation.deleteComment({ where: { id } }, info)
		return deletedComment;
	},
	async updateAuthor(parent, { id, data }, { prisma, request }, info) {

		const authorId = getUserId(request)

		const userExists = await prisma.exists.Author({ id })

		if (!userExists) throw new Error('User not found')

		if (typeof data.password === 'string') {
			data.password = await hashPassword(data.password)
		}

		const author = await prisma.mutation.updateAuthor({
			where: {
				id: authorId
			},
			data: data
		}, info)

		return author

	},
	async updateProduct(parent, { id, data }, { prisma, request }, info) {
		const authorId = getUserId(request)
		const productExists = await prisma.exists.Product({
			id,
			author: {
				id: authorId
			}
		})

		const isPublished = await prisma.exists.Product({ id, published: true })

		if (isPublished && data.published === false) {
			await prisma.mutation.deleteManyComments({ where: { product: { id } } })
		}

		if (!productExists) throw new Error('Product not found')

		const updatedProduct = await prisma.mutation.updateProduct({
			data: data,
			where: {
				id
			}
		}, info)
		return updatedProduct
	},
	async updateComment(parent, { id, data }, { prisma, request }, info) {
		const authorId = getUserId(request)
		const commentExists = await prisma.exists.Comment({ id })

		if (!commentExists) throw new Error('Comment not found')

		const updatedComment = await prisma.mutation.updateComment({
			data,
			where: {
				id,
				author: {
					id: authorId
				}
			}
		})

		return updatedComment
	}



}
export { Mutation as default }