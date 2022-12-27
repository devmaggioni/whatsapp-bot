import baileys from "@adiwajshing/baileys"
const { DisconnectReason } = baileys
import {
	Boom
} from "@hapi/boom"

import logger from "../../logger/index.js"

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export default async function keepConnected({bot, events, startBot}){
	
	const update = events["connection.update"]
	const {
		connection,
		lastDisconnect
	} = update

	if (connection === "close") {
		let reason = new Boom(lastDisconnect?.error)?.output?.statusCode

		if (reason === DisconnectReason.badSession) {
			logger.warn("Bad Session File, Please Delete path session and Scan Again")
			bot.logout()

		} else if (reason === DisconnectReason.connectionClosed) {
			logger.warn("connection closed, Reconnecting....")
			await sleep(1000); startBot()

		} else if (reason === DisconnectReason.connectionLost) {
			logger.warn("connection Lost from Server, Reconnecting...")
			await sleep(1000); startBot()

		} else if (reason === DisconnectReason.connectionReplaced) {
			logger.warn("connection Replaced, Another New Session Opened, Please Close Current Session First")
			bot.logout()
		} else if (reason === DisconnectReason.loggedOut) {
			logger.warn("Device Logged Out, Please Delete sessions and Scan Again.")
			bot.logout()
		} else if (reason === DisconnectReason.restartRequired) {
			logger.warn("Restart Required, Restarting...")
			await sleep(1000); startBot()
		} else if (reason === DisconnectReason.timedOut) {
			logger.warn("connection TimedOut, Reconnecting...")
			await sleep(1000); startBot()
		} else {
	    //let reason = new Error("Unknown Reason")
			//bot.end(reason)
     logger.warn('Unknow Error... restarting')
     await sleep(1000); startBot()
		}
	}
}