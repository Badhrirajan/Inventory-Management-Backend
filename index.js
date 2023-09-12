const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const URL = 'mongodb+srv://Badhrirajan:Badhri2211@cluster0.gxfd2vs.mongodb.net/InventoryData'

const port = 5000

async function Connect(){
    try{
        await mongoose.connect(URL)
        console.log('Database connection Successfull')
    }
    catch{
        console.log('DB Connection Error')
    }
}

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log('Server is Started in the port', port)
})

app.get('/', (req,res) => {
    res.send({
        data: "API CREATED SUCCESSFULLY!!"
    })
})

Connect()



