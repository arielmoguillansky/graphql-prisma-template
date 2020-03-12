import { getFirstName, isValidPass } from '../src/utils/author'
test('should return first name', () => {
	const name = getFirstName('Ariel Moguillansky')
	expect(name).toBe('Ariel')
})

test('should return first name on one name', () => {
	const name = getFirstName('Lucca')
	expect(name).toBe('Lucca')
})

test('should return valid pass', () => {
	const pass = isValidPass('daskghfkgiee')
	expect(pass).toBe(false)
})