const unknownEndpoint = (req,res) => {
    res.status(400).send({error:'unknown endpoint'})
}

module.exports = unknownEndpoint