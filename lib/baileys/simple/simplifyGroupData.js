const simpleGroupData = (bot, jid) => new Promise(async(resolve, reject) => {
	try {

		const metadata = await bot.groupMetadata(jid)
		
		const allMembers = metadata?.participants || []
		
		let admins = []
		let members = []
		allMembers.map(participant => {
			if (participant.admin !== null) {
				admins.push(participant)
			} else {
				members.push(participant)
			}
		})
		
		const res = {
			id: metadata?.id,
			name: metadata?.subject,
			creation_timestamp: metadata?.creation,
			creation_date: `${metadata?.creation ? new Date(metadata?.creation * 1000).toLocaleString("pt-BR") : ""}`,
			owner: metadata?.owner,
			admins,
			members
		}
		
		resolve(res)

	} catch(e) {
		reject(e)
	}
})

export default simpleGroupData