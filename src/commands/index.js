
import logger from "../../lib/logger/index.js"
import sleep from "../../lib/sleep.js"
import * as baileys from "../../lib/baileys/index.js"

export default async function Commands(params) {
	
	try {

		const {
			bot,
			from,
			sender,
			cmd,
			quoted,
			groupData,
			botInfo,
			isAdmin,
			isOwner,
			isGroup,
			mek
		} = params

		const sendMsg=s=>bot.sendMessage(from,{text:s},{quoted})
		const sendMedia = options => baileys.sendMedia({bot, quoted, mek, from}, options)

		const notAdmin=function(){return!!(isAdmin||isOwner)||(sendMsg("Somente admins podem utilizar esse comando"),!1)}
		const notOwner=function(){return!!(isOwner)||(sendMsg("Somente o criador do bot pode utilizar esse comando"),!1)}

		switch (cmd) {
		
		case "send-image":
			{
				sendMedia({
					type: "image",
					file: `${process.cwd()}/assets/images/example.jpeg`,
					caption: "hello world",
				})
			}
			break

		case "send-video":
			{
				sendMedia({
					type: "video",
					file: `${process.cwd()}/assets/videos/example.mp4`,
					caption: "hello world",
				})
			}
			break

		case "send-gif":
			{
				sendMedia({
					type: "gif",
					file: `${process.cwd()}/assets/videos/example.mp4`,
					caption: "hello world",
				})
			}
			break

		case "send-audio":
			{
				sendMedia({
					type: "audio",
					file: `${process.cwd()}/assets/audios/example.mp3`,
				})
			}
			break

		case "send-sticker":
			{
				sendMedia({
					type: "sticker",
					file: `${process.cwd()}/assets/stickers/example.webp`,
				})
			}
			break
		
		case "hello":
			{
				sendMsg("hello")
			}
			break

		case "bot-info": case "group-info":
			{
				if (!notOwner()) return
			
				let info = ""

				let obj = cmd === "bot-info" ? botInfo : groupData

				for (let key in obj) {
					info += `${key} = ${obj[key]}\n`
				}

				sendMsg(info)
			}
			break

		case "groups":
			{
				if (!notAdmin()) return
			
				try {
					let groups = await baileys.getGroups(bot)
					let res = ""
					groups.map(group => {
						res += "\n\n-----\n"
						res += `group name: ${group.subject}\n`
						res += `creation: ${new Date(group.creation * 1000).toLocaleString()}\n`
						res += `owner: ${group?.owner?.split("@")[0] || "-"}\n`
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

	} catch(e) {
		logger.error(e)
	}
}