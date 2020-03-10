const Comment = {
	author(parent, args, { db }, info) {
		return db.authors.find((author) => {
			return author.id === parent.author
		})
	},
	product(parent, args, { db }, info) {
		return db.products.find((product) => {
			return product.id === parent.product
		})
	}
}
export { Comment as default }