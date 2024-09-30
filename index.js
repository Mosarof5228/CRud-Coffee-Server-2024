const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e4gyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://CRUD_COFFEE_SERVER:xIZ8O8QZgq6P7COY@cluster0.e4gyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const CoffeeCollection = client.db("Coffee_DB").collection('coffees');
    const UserCollection = client.db('Coffee_DB').collection('users')


    app.get('/coffees', async (req, res) => {
      const cursor = CoffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/coffees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await CoffeeCollection.findOne(query);
      res.send(result);
    })

    app.post('/coffees', async (req, res) => {
      const newCoffees = req.body;
      const result = await CoffeeCollection.insertOne(newCoffees);
      res.send(result);

    })

    app.put('/coffees/id', async (req, res) => {
      const id = req.params.id;
      const coffee = req.body;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }

      const result = await CoffeeCollection.updateOne(filter, updateCoffee, options)
      res.send(result);

    })




    app.put('/coffees/:id', async (req, res) => {
      const id = req.params.id;
      const coffee = req.body;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateCoffee = {
        $set: {
          name: coffee.name,
          color: coffee.color,
          brand: coffee.brand,
          madein: coffee.madein,
          photo: coffee.photo,
          taste: coffee.tase,

        }
      }
      const result = await CoffeeCollection.updateOne(filter, updateCoffee, options)
      res.send(result);

    })

    app.delete('/coffees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await CoffeeCollection.deleteOne(query)
      res.send(result);

    })

    // User Related API Start Here


    app.get('/users', async (req, res) => {
      const cursor = UserCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await UserCollection.findOne(query);
      res.send(result);
    })


    app.post('/users', async (req, res) => {
      const newUsers = req.body;
      console.log(newUsers);
      const result = await UserCollection.insertOne(newUsers);
      res.send(result);
    })




    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await UserCollection.deleteOne(query);
      res.send(result);

    })









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("Coffe Crud Server is runninng")
})

app.listen(port, () => {
  console.log(`Coffee Server is running on port ${port}`)
})

// xIZ8O8QZgq6P7COY
//CRUD_COFFEE_SERVER