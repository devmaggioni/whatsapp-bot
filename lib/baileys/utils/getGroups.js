
const getGroups = bot => new Promise(async(resolve, reject) => {
	try {
		let getGroups = await bot.groupFetchAllParticipating()
		let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
		resolve(groups)
	} catch(e) {
		reject(e)
	}
})

export default getGroups