export default function simpleMessage(message) {

	try {

		let mek = message.message
		let type = Object.keys(mek)[0] || undefined

		let text = mek?.extendedTextMessage?.text || mek?.conversation || mek?.reactionMessage?.text || mek?.imageMessage?.caption || mek?.videoMessage?.caption || undefined

		let mimetype = mek?.imageMessage?.mimetype || mek?.videoMessage?.mimetype || mek?.audioMessage?.mimetype || undefined

		let pushName = message?.pushName || undefined

let timestamp = message?.messageTimestamp || undefined

		let key = {
			remoteJid: message?.key?.remoteJid,
			fromMe: message?.key?.fromMe,
			id: message?.key?.id,
			participant: message?.key?.participant,
			pushName,
			timestamp
		}

		let composeData = {
			header: key,
			body: {
				type,
				text,
				mimetype
			}
		}

		return composeData

	} catch(err) {
		console.log(err.stack)
	}
}