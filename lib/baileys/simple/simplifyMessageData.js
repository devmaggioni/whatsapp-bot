export default function simpleMessage(message, groupData) {

	try {

		let mek = message.message
		let type = Object.keys(mek)[0] || undefined

		let text = mek?.extendedTextMessage?.text || mek?.conversation || mek?.reactionMessage?.text || mek?.imageMessage?.caption || mek?.videoMessage?.caption || undefined
		if (text && text.length > 1000) text = "too many characters to process "

		let mimetype = mek?.imageMessage?.mimetype || mek?.videoMessage?.mimetype || mek?.audioMessage?.mimetype || undefined

		let pushName = message?.pushName || undefined

		let seconds = mek?.videoMessage?.seconds || mek?.audioMessage?.seconds || undefined

		let timestamp = message?.messageTimestamp || undefined

		let expiration = mek?.conversation?.contextInfo?.expiration || mek?.extendedTextMessage?.contextInfo?.expiration || mek?.imageMessage?.contextInfo?.expiration || mek?.videoMessage?.contextInfo?.expiration || mek?.audioMessage?.contextInfo?.expiration || mek?.stickerMessage?.contextInfo?.expiration || undefined

		let key = {
			remoteJid: message?.key?.remoteJid,
			fromMe: message?.key?.fromMe,
			id: message?.key?.id,
			participant: message?.key?.participant,
			pushName,
			timestamp,
			date: `${new Date(timestamp * 1000).toLocaleString("pt-BR")}`,
			expiration
		}

		let res = { header: {}, body: {}}
		res.header = key
		res.body.type = type
		if (text) res.body.text = text
		if (mimetype) res.body.mimetype = mimetype
		if (seconds) res.body.seconds = seconds

		return res

	} catch(err) {
		console.log(err.stack)
	}
}