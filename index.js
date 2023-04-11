const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncd7obd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        await client.connect();

        const serviceCollect = client.db("carService").collection("service");


        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollect.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await serviceCollect.findOne(query);
            res.send(result);
        })

        app.post('/service', async (req, res) => {
            const service = req.body;
            const result = await serviceCollect.insertOne(service);
            res.send(result);
        })

        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await serviceCollect.deleteOne(query);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);




app.listen(port, () => {
    console.log('car server')
});