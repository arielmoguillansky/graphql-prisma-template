import getUserId from '../utils/getUserId'

const Subscription = {
	comment: {
		subscribe(parent, { productId }, { prisma }, info) {
			return prisma.subscription.comment({
				where: {
					node: {
						product: {
							id: productId
						}
					}
				}
			}, info)
		}
	},
	product: {
		subscribe(parent, args, { prisma }, info) {

			return prisma.subscription.product({
				where: {
					node: {
						published: true
					}
				}
			}, info)
		}
	},
	authorProduct: {
		subscribe(parent, args, { prisma, request }, info) {
			const authorId = getUserId(request)

			return prisma.subscription.product({
				where: {
					node: {
						auhtor: {
							id: authorId
						}
					}
				}
			}, info)
		}
	}
}
export { Subscription as default }