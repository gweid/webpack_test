const express = require("express")

const app = express()

app.get('/api/user', (req, res) => {
    res.json({
        name: "hello, webpack"
    })
})

app.listen(3000)
