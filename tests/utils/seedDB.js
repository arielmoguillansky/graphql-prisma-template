import prisma from '../../src/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authorOne = {
	input: {
		authorname: "Ariel",
		email: "a@a.com",
		password: bcrypt.hashSync('ariel123'),
		age: 27
	},
	author: undefined,
	jwt: undefined,
}

const productOne = {
	input: {
		productname: "Silla",
		desc: "kosjfksdofjsiofsd",
		published: true,
	},
	product: undefined
}

const seedDb = async () => {
	//Delete test data on db
	await prisma.mutation.deleteManyProducts()
	await prisma.mutation.deleteManyAuthors()
	//create authorOne
	authorOne.author = await prisma.mutation.createAuthor({
		data: authorOne.input
	})
	authorOne.jwt = jwt.sign({ authorId: authorOne.author.id }, process.env.JWT_SECRET)
	productOne.product = await prisma.mutation.createProduct({
		data: {
			...productOne.input,
			author: {
				connect: {
					id: authorOne.author.id
				}
			}
		}
	})
	await prisma.mutation.createProduct({
		data: {
			productname: "Cuaderno",
			desc: "oquuueirñaluaofopifqijeifefnjáioiqiq",
			published: false,
			author: {
				connect: {
					id: authorOne.author.id
				}
			}
		}
	})
}

export { seedDb as default, authorOne, productOne }