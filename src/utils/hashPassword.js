import bcrypt from 'bcryptjs'

const hashPassword = (pass) => {
	if (pass.lenght < 8) throw new Error('Password must be 8 characters or longer')

	const hashpass = bcrypt.hash(pass, 10)

	return hashpass
}

export { hashPassword as default }