import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDb, { authorOne } from './utils/seedDB'
import getClient from './utils/getClient'

const client = getClient()

jest.setTimeout(60000)

beforeEach(seedDb)

test('Should create new user', async () => {
	const creteAuthor = gql`
		mutation{
			createAuthor(
				authorname:"Gerardo",
				email:"g@g.com",
				password:"gerardo123",
				age:45
			){
				token
				author{
					id
					authorname
				}
			}
		}
	`

	const res = await client.mutate({
		mutation: creteAuthor
	})

	const exists = await prisma.exists.Author({ id: res.data.createAuthor.author.id })
	expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
	const getAuthors = gql`
		query{
			authors{
				id
				email
				authorname
			}
		}
	`

	const res = await client.query({ query: getAuthors })

	expect(res.data.authors.length).toBe(1)
	expect(res.data.authors[0].email).toBe(null)
	expect(res.data.authors[0].authorname).toBe('Ariel')
})

test('Should not login with bad credentials', async () => {

	const login = gql`
		mutation{
			loginAuthor(
				email:"a@a.com",
				password:"xfsdfsfd"
			)
		}{
			token
		}
	`

	await expect(client.mutate({ mutation: login })).rejects.toThrow()

})

test('Should not sign up with short password', async () => {
	const singUp = gql`
		mutation{
			createAuthor(
				authorname:"Bianca",
				email:"b@b.com",
				age:33,
				password:"bianca"
			)
		}{
			author{
				id
			}
		}
	`

	await expect(client.mutate({ mutation: singUp })).rejects.toThrow()
})

test('Should fetch author profile', async () => {
	const client = getClient(authorOne.jwt)

	const getAuthorProfile = gql`
		query{
			author{
				id
				authorname
				email
			}
		}
	`

	const { data } = await client.query({ query: getAuthorProfile })
	expect(data.author.id).toBe(authorOne.author.id)
	expect(data.author.email).toBe(authorOne.author.email)
	expect(data.author.authorname).toBe(authorOne.author.authorname)
})