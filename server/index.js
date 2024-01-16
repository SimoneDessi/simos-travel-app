const PORT = 8000;
const { default: axios } = require("axios");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json("Welcome to my travel app");
});

/*=====
GET ALL POSTS
=======*/

app.get("/posts", async (req, res) => {
  const url = `${process.env.ASTRA_URL}?page-size=3`;

  const options = {
    method: "GET",
    headers: {
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };

  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

/*=====
GET SINGLE POST
=======*/

app.get("/posts/:postId", async (req, res) => {
  const id = req.params.postId;
  const url = `${process.env.ASTRA_URL}/${id}`;

  const options = {
    method: "GET",
    headers: {
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

/*=====
UPDATE POST
=====*/

app.put('/edit/:postId', async (req, res) => {
  const id = req.params.postId
  const data = req.body.data

  const url = `${process.env.ASTRA_URL}/${id}`

  const options = {
    method: 'PUT',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': process.env.TOKEN,
    },
    data,
  }

  try {
    const response = await axios(url, options)
    res.status(200).json(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err })
  }
})

/*=====
CREATE POST
=====*/

app.post('/create', async (req,res) =>{
  const data = req.body.data
  const url = process.env.ASTRA_URL

  const options = {
    method: 'POST',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': process.env.TOKEN,
    },
    data,
  }
  try {
    const response = await axios(url, options)
    res.status(200).json(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err })
  }
})

/*=====
CREATE POST
=====*/

app.delete('/delete/:postId', async (req, res) => {
  const id = req.params.postId
  const url = `${process.env.ASTRA_URL}/${id}`

  const options = {
    method: 'DELETE',
    headers: {
      'X-Cassandra-Token': process.env.TOKEN,
    },
  }
  try {
    const response = await axios(url, options)
    res.status(200).json(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err })
  }
})


app.listen(PORT, console.log("Server is running on PORT " + PORT));
