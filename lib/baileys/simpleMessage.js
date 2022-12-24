export default function simpleMessage(message) {

	let mek = message.message
	let type = Object.keys(mek)[0] || undefined

	let text = mek?.extendedTextMessage?.text || mek?.conversation || mek?.reactionMessage?.text || mek?.imageMessage?.caption || mek?.videoMessage?.caption || undefined

	let mimetype = mek?.imageMessage?.mimetype || mek?.videoMessage?.mimetype || mek?.audioMessage?.mimetype || undefined

	let key = {
		remoteJid: message?.key?.remoteJid,
		fromMe: message?.key?.fromMe,
		id: message?.key?.id,
		participant: message?.key?.participant
	}

	let composeData = {}
	composeData.key = key
	composeData.type = type
	if (text) composeData.text = text
	if (mimetype) composeData.mimetype = mimetype

	return composeData
}