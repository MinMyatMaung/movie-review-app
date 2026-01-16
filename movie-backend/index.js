import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

if (!mongo_username || !mongo_password) {
    console.error("Missing MONGO_USERNAME or MONGO_PASSWORD .env")
    process.exit(1)
}

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.l8vtgpj.mongodb.net/?appName=Cluster0`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running`);
});