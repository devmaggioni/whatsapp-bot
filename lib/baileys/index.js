import baileys from "@adiwajshing/baileys"
import path from "path"
import pino from "pino"
import logger from "../logger/index.js"
import simpleMessage from "./simpleMessage.js"

const {
	default: makeWASocket,
	DisconnectReason,
	useMultiFileAuthState
} = baileys

const {
	state,
	saveCreds
} = await useMultiFileAuthState(path.join(process.cwd(), ".baileys_files", "baileys_auth_info"))

export const Sock = (config) => makeWASocket(config || {
	printQRInTerminal: false,
	auth: state,
	logger: pino({
		level: "error"
	})
})

export function keepConnected(events, startFunction) {
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
				startFunction()
			} else {
				logger.info("Connection closed. You are logged out.")
			}
		}
	} catch(err) {
		throw new Error(err)
	}
}

export {
	saveCreds,
	simpleMessage
}