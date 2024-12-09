const express = require('express')
const app = express()
const port = 3000

app.use(express.static('example'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})