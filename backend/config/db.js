const mongoose = require('mongoose')

const connectDb = async() => {
    try {
        const conn = await mongoose.connect('mongodb+srv://sharanrp35:NvI8e4uN48cIsD6x@cluster0.rspkkmk.mongodb.net/?retryWrites=true&w=majority' , {
            useNewUrlParser : true,
            useUnifiedTopology : true ,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (error) {
      console.log(`Error message : ${error.message}`)
      process.exit()
    }
}

module.exports = connectDb