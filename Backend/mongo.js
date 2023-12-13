const mongoose = require('mongoose')

if(process.argv.length < 3) {console.log('provide with the password'); process.exit(1)}
const password = process.argv [2]

const url = `mongodb+srv://root:${password}@cluster0.ampzclt.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url).then(()=>{
    console.log('connected to database')

    if(process.argv.length == 3) {

        const phoneBookSchema = new mongoose.Schema({
            name: String,
            number: Number,
        })
    
        const phoneBook = mongoose.model('phonebook',phoneBookSchema)
    
    
        phoneBook.find().then(data => {
            data.forEach(value => {
                console.log(value)
            })
            mongoose.connection.close()
            process.exit(1)
        })
    }
    
    if(process.argv.length > 3) {
    
        const name = process.argv [3]
        const number = process.argv [4]
    
        const phonebook = new phoneBook({
            name: name,
            number: Number(number),
        })
    
        phonebook.save().then(() => {
            console.log('saved to database successfully')
            mongoose.connection.close()
        })
    
        //process.exit(1)
    }


}).catch((error)=>{
    console.log('error')
})








