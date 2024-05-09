const express = require("express")
const app = express()
let mongoose = require("mongoose")
let Chat = require("./models/chat.js")
const path = require("path")
const methodOverride = require('method-override')

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

main().then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

app.get("/chats", async (req,res)=>{
        let chats = await Chat.find()
        res.render("index.ejs", {chats})
})

// new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/chats",(req,res)=>{
    let {from , to ,msg} = req.body
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    
    newChat.save().then((result)=>{
        console.log("chat saved")
    }).catch((err)=>{
        console.log(err)
    })
    res.redirect("/chats")
})

app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params
    let chat = await Chat.findById(id)
    res.render("edit.ejs", { chat })
})

//edit route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params
    let {msg:newMsg} = req.body
    let updateChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true})
    // console.log(updateChat)
    res.redirect("/chats")
})

//delete route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params
    let deleteChat = await Chat.findByIdAndDelete(id)
    res.redirect("/chats")
})

app.listen(8080,()=>{
    console.log("working on port 8080")
})