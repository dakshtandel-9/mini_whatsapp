let mongoose = require("mongoose")
const Chat = require("./models/chat.js")

main().then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

Chat.insertMany([
    { from: "54ioio", to: "dodo", msg: "hii am gogo!", created_at: Date() },
]
)