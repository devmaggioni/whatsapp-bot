import * as baileys from "../../lib/baileys/index.js"
import logger from "../../lib/logger/index.js"

export default function handleConnection(bot, conn) {

logger.debug(conn)

if (conn?.connection === "connecting"){
	logger.info("Bot is connecting...")
}

if (conn?.connection === "open"){
	logger.info("Bot Online ✓")
}

if (conn?.qr) {
	logger.info("Scan the QR Code to connect to WhatsApp")
	
qrcode.generate(conn.qr, {
	small: true
}, qrcode => console.log('\n' + qrcode))
}
	
}