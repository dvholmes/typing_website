const express = require('express');
const app = express();
const port = 3000;


// backend portion of the webpage.
app.get('/', (req, res) => {
  res.send('Hello Desmond');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});