import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutation'
import Author from './Author'
import Product from './Product'
import Comment from './Comment'
import Subscription from './Subscription'

const resolvers = {
	Query,
	Mutation,
	Subscription,
	Author,
	Product,
	Comment
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }