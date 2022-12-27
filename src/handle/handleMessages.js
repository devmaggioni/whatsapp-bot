import * as dotenv from "dotenv"
dotenv.config()
import logger from "../../lib/logger/index.js"
import * as baileys from '../../lib/baileys/index.js'
import commands from "../commands/index.js"

export default async function handleMessages(bot, message) {
	try {

		if (!message?.messages[0]) return
		if (message.type !== "notify") return
		if (message?.messages[0]?.key?.remoteJid === "status@broadcast") return
		if (message?.messages[0]?.key?.fromMe) return

		const {
			simpleMessage,
			simpleGroupData,
			simpleBotInfo
		} = baileys

		const mek = simpleMessage(message.messages[0])
		const quoted = message?.messages[0] || undefined

		const groupData = mek?.header?.remoteJid?.endsWith("g.us") ? await simpleGroupData(bot, mek.header.remoteJid) : false;
		
		const botInfo = groupData ? await simpleBotInfo(bot, groupData) : false

		logger.info(mek)
		console.log('\n')
		logger.debug(groupData)
		logger.debug(botInfo)
		logger.debug(message.messages[0])

		const sender = mek?.header?.remoteJid

		const prefix = process.env.BOT_PREFIX || "#"
		const cmd = mek?.body?.text && mek?.body?.text.trim().startsWith(prefix) ? mek.body.text.trim().toLowerCase().split(prefix)[1].split(" ")[0]: undefined
		let args = cmd && mek?.body?.text.split(" ")[1] ? mek?.body?.text.split(" ")[1].trim(): undefined

		const params = {
			bot,
			cmd,
			sender,
			prefix,
			args,
			mek,
			quoted,
			simpleGroupData,
			simpleBotInfo
		}
		if (cmd) commands(params)

	} catch(e) {
		logger.error(e)
	}
}