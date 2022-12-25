import mongoClient from "../connection/mongoClient.js"

const  collection = ({
    baileysCollection : (str) => {
        return mongoClient.db().collection(str);
    }
})

const baileysCollection = collection.baileysCollection('baileys_auth_state')

 export default baileysCollection