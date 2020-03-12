const getFirstName = (fullName) => {
	return fullName.split(' ')[0]
}

const isValidPass = (pass) => {
	return pass.length >= 6 && !pass.toLowerCase().includes('password')
}

export { getFirstName, isValidPass }