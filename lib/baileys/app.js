import baileys from "@adiwajshing/baileys"
import path from "path"
import pino from "pino"

import logger from "../logger/index.js"
import db from "../mongodb/index.js"

const {
	useMongoAuthState,
	baileysCollection
} = db

const {
	default: makeWASocket,
	useMultiFileAuthState,
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
	auth: !mongoState ? defaultState : state === 'local' ? defaultState : mongoState,/*state && state === "local" ? defaultState: mongoState,*/
	logger: pino({
		level: "error"
	})
})