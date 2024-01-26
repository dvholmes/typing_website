const express = require('express');
const { MongoClient } = require("mongodb");
require('dotenv').config();
const app = express();
const port =5000;

// create mongodb client

const clientDB = new MongoClient(process.env.mongo_connectionstring)

// backend portion of the webpage.
app.get('/PracticeApi', async function (req, res) {

  await clientDB.connect();


  const main_db = clientDB.db("sample_passages")
  const practice = main_db.collection("practice");

  const number_ofPassages = await practice.countDocuments() - 1;

  // select a random document from the collection.
  let indexSelected = Math.floor((Math.random() * number_ofPassages));


  console.log("index selected:", indexSelected);

  const nthDocument = await practice.findOne({}, { skip: indexSelected });
  let filtered_passage = nthDocument["text"].replace(/\r?\n|\r/g, '')
  
  // in response, send passage back to the interface.
  res.json({"text":filtered_passage});
  await clientDB.close();

});


app.get('/TestingApi', async function(req, res) {
  try {
    await clientDB.connect();
    
    const test_db = clientDB.db("sample_passages");
    const Testing = test_db.collection("Testing"); // Get the Testing collection
    console.log("called function")

    // Get the last document with the array of words.
    const lastDocument = await Testing.findOne({}, { sort: { _id: -1 } });

    // Check if a document was found and send the words to the front end.
    
    if (lastDocument && lastDocument.words) {
      res.json({ "words": lastDocument.words });
    } else {
      res.json({ "words": [] }); // Return an empty array if no document was found
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ "error": "Internal server error" });
  } finally {
    await clientDB.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
