import logger from "../../lib/logger/index.js"
import sleep from "../../lib/sleep.js"
import * as baileys from '../../lib/baileys/index.js'

export default async function Commands(params) {
	
	const { bot, sender, cmd, quoted,
	simpleGroupData, simpleBotInfo } = params

	const sendMsg = text => bot.sendMessage(sender, {
		text
	}, {
		quoted
	})

	switch (cmd) {

	case "hello":
		{
			await bot.sendMessage(sender,
				{
					text: "Hello!"
				}, {
					quoted
				})
		}
		break

	case "groups":
		{
			try {
				let groups = await baileys.getGroups(bot)
				logger.info(groups)

				let res = ""
				groups.map(group => {
					res += "\n\n-----\n"
					res += `group name: ${group.subject}\n`
					res += `creation: ${new Date(group.creation * 1000).toLocaleString()}\n`
					res += `owner: ${group?.owner?.split('@')[0] || "-"}\n`
					res += `participants: ${group?.participants?.length}`
					res += "\n-----\n\n"
				})

				sendMsg(res)

			} catch(e) {
				logger.error(e)
			}
		}
		break
	}

}