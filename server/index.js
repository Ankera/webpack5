const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  console.log('====')
  res.json({
    id: 1,
    name: "Tom"
  })
})

app.listen(3004, () => {
  console.log('server successful')
})