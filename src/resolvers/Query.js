import getUserId from '../utils/getUserId'
const Query = {
	async authors(parents, { query }, { prisma }, info) {

		const opArgs = {}

		if (query) {
			opArgs.where = {
				OR: [{
					authorname_contains: query.toLowerCase()
				}, {
					email_contains: query.toLowerCase()
				}]
			}
		}
		const authors = await prisma.query.authors(opArgs, info);

		return authors

	},
	products(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
		const opArgs = {
			first,
			skip,
			after,
			orderBy,
			where: {
				published: true,
			}
		}

		if (query) {
			opArgs.where = {
				productname_contains: query
			}
		}

		return prisma.query.products(opArgs, info);

	},
	comments(parent, { query, first, skip, after, orderBy }, { prisma }, info) {

		const opArgs = {
			first,
			skip,
			after,
			orderBy
		}

		return prisma.query.comments(opArgs, info)

	},
	async product(parent, args, { prisma, request }, info) {
		const authorId = getUserId(request, false)

		const products = await prisma.query.products({
			where: {
				id: args.productId,
				OR: [
					{ published: true },
					{
						author: {
							id: authorId
						}
					}
				]
			}
		}, info)


		if (products.length === 0) throw new Error('Product not found')

		return products[0]

	},
	async author(parent, args, { prisma, request }, info) {
		const authorId = getUserId(request)

		const auhtorExists = await prisma.exists.Author({ id: authorId })


		if (!auhtorExists) throw new Error('Author not found')

		const author = await prisma.query.author({
			where: {
				id: authorId
			}
		})

		return author
	},
	async allProducts(parent, args, { prisma, request }, info) {
		const authorId = getUserId(request)

		const opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy,
			where: {
				author: {
					id: authorId
				}
			}
		}

		if (args.query) {
			opArgs.where = {
				productname: args.query
			}
		}

		const products = prisma.query.products(opArgs, info)

		return products
	}
}

export { Query as default }