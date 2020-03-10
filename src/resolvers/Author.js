import getUserId from '../utils/getUserId'
const Author = {
	products: {
		fragment: "fragment productId on Product {id}",
		resolve(parent, args, { prisma, request }, info) {
			const products = prisma.query.products({
				where: {
					published: true,
					author: {
						id: parent.id
					}
				}
			})
			return products
		}
	},
	email: {
		fragment: "fragment authorId on Author {id}",
		resolve(parent, args, { request }, info) {
			const authorId = getUserId(request, false) // false, because auth is not required here

			if (authorId && authorId === parent.id) {
				return parent.email
			} else {
				return null
			}
		}
	}
}
export { Author as default }