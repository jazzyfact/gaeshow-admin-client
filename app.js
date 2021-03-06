const express = require('express')
const fs = require('fs')
const app = express()
const indexDir = `/public`

app.use(express.static(__dirname + indexDir))

app.get('/', (req, res) => {
    fs.readFile(__dirname + indexDir + '/index.html', (error, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
    })
})

app.listen(7777, function() {
    console.log(`web-shopping-mall-admin running`)
})
