const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()


app.use(cors()) // 允许跨域
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', require('./page'))

app.listen(8001, () => console.log('server is running at http://localhost:8001'))
