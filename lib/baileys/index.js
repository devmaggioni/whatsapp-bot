import baileys from "@adiwajshing/baileys"
import path from "path"
import pino from "pino"

import logger from "../logger/index.js"
import simpleMessage from "./simple/simplifyMessageData.js"
import db from "../mongodb/index.js"

const { useMongoAuthState, baileysCollection } = db

const {
	default: makeWASocket,
	DisconnectReason,
	useMultiFileAuthState
} = baileys

export const {
	state: mongoState,
	saveCreds: mongoSaveCreds
} = await useMongoAuthState(baileysCollection)

export const {
	state: defaultState,
  saveCreds: defaultSaveCreds
} = await useMultiFileAuthState(path.join(process.cwd(), ".baileys", "auth_info"))


export const Sock = state => makeWASocket({
	printQRInTerminal: false,
	auth: state && state === "local" ? defaultState : mongoState,
	logger: pino({
		level: "error"
	})
})

export function keepConnected(events, startBot) {
	try {
		const update = events["connection.update"]
		const {
			connection,
			lastDisconnect
		} = update
		if (connection === "close") {
			// reconnect if not logged out
			var _a,
				_b
			if (((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0: lastDisconnect.error) === null || _a === void 0 ? void 0: _a.output) === null || _b === void 0 ? void 0: _b.statusCode) !== DisconnectReason.loggedOut) {
				startBot()
			} else {
				logger.info("Connection closed. You are logged out.")
			}
		}
	} catch(err) {
		throw new Error(err)
	}
}

export { simpleMessage }