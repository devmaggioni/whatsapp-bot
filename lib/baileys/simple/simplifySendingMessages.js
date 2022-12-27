import fs from "fs"
import path from "path"
	
export const sendMedia = function({bot, quoted, mek, from }, { to = from, type, caption, ptt = true, file, mentions = [], forward = 0}){
		
	if (!type) throw new Error("before sending a message you need to specify the type")
		
	let options = {}
	let options2 = {}
		
	let read = file.includes("http") ? { url: file } : fs.readFileSync(path.join(file))
	if (type === "image") options.image = read
	else if (type === "video") options.video = read
	else if (type === "gif"){
		options.video = read
		options.gifPlayback = true
	}
	else if (type === "sticker") options.sticker = read
	else if (type === "audio"){
		options.audio = read
		options.ptt = ptt
		options.mimetype = "audio/mp4"
	}

	if (caption) options.caption = caption
	if (forward) options.contextInfo = { forwardingScore: forward, isForwarded: !!forward }
	if (mentions.length >= 1) options.mentions = mentions

	options2.quoted = quoted
	if (mek?.header?.expiration) options2.ephemeralExpiration = mek?.header?.expiration
		
	bot.sendMessage(to, options, options2)
		
}