import mongoClient from "../connection/mongoClient.js"

const  collection = ({
	baileysCollection : (str) => {
		if (mongoClient) return mongoClient.db().collection(str)
		return false
}
})

const baileysCollection = collection ? collection.baileysCollection("baileys_auth_state") : undefined

export default baileysCollection