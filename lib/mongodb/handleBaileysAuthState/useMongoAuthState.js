import baileys from "@adiwajshing/baileys"
import logger from "../../logger/index.js"

const { BufferJSON, initAuthCreds, proto } = baileys

const useMongoAuthState = async (colletion) => {
	try {

	const writeData = async (data, file) => {
		await colletion.updateOne(
			{ file: fixFileName(file) },
			{ $set: { data: JSON.stringify(data, BufferJSON.replacer) } },
			{ upsert: true }
		)
	}

	const readData = async (file) => {
		const document = await colletion.findOne({ file: fixFileName(file) })
		if (!document) return null
		return JSON.parse(document.data, BufferJSON.reviver)
	}

	const removeData = async (file) => {
		await colletion.deleteOne({ file: fixFileName(file) })
	}

	const fixFileName = (file) => file?.replace(/\//g, "__")?.replace(/:/g, "-")

	const creds = await readData("creds.json") ?? initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data = {}

					await Promise.all(
						ids.map(async (id) => {
							let value = await readData(`${type}-${id}.json`)

							if(type === "app-state-sync-key" && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}

							data[id] = value
						})
					)

					return data
				},

				set: async (data) => {
					const tasks = []

					for (const category in data) {
						for (const id in data[category]) {
							const value = data[category][id]
							const file = `${category}-${id}.json`
							tasks.push(value ? writeData(value, file) : removeData(file))
						}
					}

					await Promise.all(tasks)
				}
			}
		},

		saveCreds: async () => {
			await writeData(creds, "creds.json")
		},
	}
	
	} catch(e) {
		logger.warn('There was some error with the database. Saving Credentials Locally')
		logger.error(`This probably happened because the environment variable "URL_MONGO" is not defined` + "\n\n" + e.stack)
		return {
			state: undefined,
			saveCreds: undefined
		}
	}
}

export default useMongoAuthState