const notNull = (input) => {
	if(input == '') {
		return 'Please enter a valid input'
	}
	if (input == null){
		return 'Please enter a valid input'
	}
	if(!input) {
		return 'Please enter a valid input'
	}
	return true
}

module.exports = notNull