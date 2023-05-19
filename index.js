const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://web_arts_fact:XTJoqDULBdXeudlA@cluster0.mcdvihz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const addToCard = client.db('webArtsFact').collection('addToCard')

        app.get('/addtocard', async(req, res) =>{
            const query = {}
            const result = await addToCard.find(query).toArray()
            res.send(result)
        })

        app.post('/addToCard', async(req, res) =>{
            const card = req.body 
            const result = await addToCard.insertOne(card)
            res.send(result)
        })

        app.delete('/addToCard/:id', async (req, res) =>{
            const id = req.params.id
            // console.log(id)
            const query = {_id: new ObjectId(id)}
            // console.log(query)
            const result  = await addToCard.deleteOne(query)
            res.send(result)
        })
    }
    finally{

    }
}

run().catch(console.dir)

app.get('/', (req, res) =>{
    res.send('API Running...')
})

app.listen(port, () =>{
    console.log(`server running on port ${port}`)
})