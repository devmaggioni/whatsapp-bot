import * as dotenv from "dotenv"
dotenv.config()
import logger from "../../lib/logger/index.js"
import {
	simpleMessage
} from "../../lib/baileys/index.js"

export default async function handleMessages(bot, message) {

	if (!message?.messages[0]) return
	if (message.type !== "notify") return
	if (message?.messages[0]?.key?.remoteJid === "status@broadcast") return
	if (message?.messages[0]?.key?.fromMe) return

	let mek = simpleMessage(message.messages[0])
	let quoted = message?.messages[0] || undefined

	console.log("\n\n")
	logger.info(mek)
	console.log("\n\n")
	logger.debug(message.messages[0])

	let sender = mek?.header?.remoteJid

	let prefix = process.env.BOT_PREFIX || "#"
	let cmd = mek?.body?.text && mek?.body?.text.trim().startsWith(prefix) ? mek.body.text.trim().toLowerCase().split(prefix)[1].split(" ")[0]: undefined
	let args = cmd && mek?.body?.text.split(" ")[1] ? mek?.body?.text.split(" ")[1].trim(): undefined

	switch (cmd) {

	case "hello":
		await bot.sendMessage(sender,
			{
				text: "Hello!"
			}, {
				quoted
			})
		break

	}

}