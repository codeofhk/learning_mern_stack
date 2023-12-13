const personRouter = require('express').Router()
const phoneBook = require('../models/persons')

let phoneBookValue = []

personRouter.get('/',(req,res)=>{
    phoneBook.find({}).then(data => res.json(data))
})

personRouter.get('/info',(req,res)=>{

    res.send(`<p>Phone Book has ${phoneBookValue.length} people <br/> ${new Date} </p>`)
})

personRouter.get('/:id',(req,res) => {
    const id = Number(req.params.id)
    console.log(id)
    phoneBook.findById(req.params.id).then((person)=>{
        console.log(person)
    })

})

personRouter.delete('/:id',(req,res) => {
    const id = Number(req.params.id)
    phoneBook.findByIdAndDelete(req.params.id).then(()=>{res.status(204).end()}).catch((error) => {res.status(400).send({error:'error'})})
    phoneBookValue = phoneBookValue.filter(note => note.id!==id)

    res.status(204).end()
})

const checkAlready = (name) =>{
    for(let i=0;i<phoneBookValue.length;i++) if(phoneBookValue[i].name===name) return true
    return false 
}

const getId = () => {
    return Math.floor(Math.random()*(1000))
}

personRouter.post('/',(req,res) => {

    if(!req.body.name) return res.status(400).json({error: 'content missing'})

    if(checkAlready(req.body.name)) return res.status(400).json({error: 'name already exist'})

    const name = req.body.name
    const number = Number(req.body.number)

    const phonebook = new phoneBook({
        name: req.body.name,
        number: Number(req.body.number),
    })

    phonebook.save().then(() => {
        console.log('saved to database successfully')
    })
    phoneBook.find({}).then(data => res.status(200).json(data))
})

module.exports = personRouter