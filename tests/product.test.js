
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDb, { authorOne, productOne } from './utils/seedDB'
import getClient from './utils/getClient'

const client = getClient()

jest.setTimeout(60000)

beforeEach(seedDb)

test('Should expose public products', async () => {
	const getProducts = gql`
		query{
			products{
				id
productname
desc
published
			}
		}
	`

	const res = await client.query({ query: getProducts })
	expect(res.data.products.length).toBe(1)
	expect(res.data.products[0].productname).toBe('Silla')
	expect(res.data.products[0].published).toBe(true)
})

test('Should show auth author all products', async () => {
	const client = getClient(authorOne.jwt)

	const geAuthProducts = gql`
		query{
			allProducts{
				id
				productname
				published
			}
		}
	`

	const { data } = await client.query({ query: geAuthProducts })
	expect(data.allProducts.length).toBe(2)

})

test('Should update product', async () => {
	const client = getClient(authorOne.jwt)

	const updateProduct = gql`
		mutation{
			updateProduct(
				id:"${productOne.product.id}",
				data:{
					published:false
				}
			){
				id
				productname
				desc
				published
			}
		}
	`
	const { data } = await client.mutate({ mutation: updateProduct })
	const exists = await prisma.exists.Product({ id: productOne.product.id, published: false })
	expect(data.updateProduct.published).toBe(false)
	expect(exists).toBe(true)
})