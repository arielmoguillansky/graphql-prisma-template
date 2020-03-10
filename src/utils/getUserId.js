import jwt from 'jsonwebtoken'
const getUserId = (req, requireAuth = true) => {
	const header = req.request ? req.request.headers.authorization : req.connection.context.Authorization



	if (header) {

		const token = header.replace('Bearer ', '')
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		return decoded.authorId
	}

	if (requireAuth) throw new Error('Authentication required')

	return null

}

export { getUserId as default }