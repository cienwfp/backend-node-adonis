const mongoose = require("mongoose")
const { find } = require("./Document")
const Document = require("./Document")
const express = require('express');
const route = require('./router')
const cors = require('cors')

const app = express();
let port = 3333;

app.use(route);

mongoose
    .connect("mongodb://192.168.1.136:27017/documentTest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("db connected")
        return (
            app.listen(process.env.port || port, () => {
                console.log('Servidor em execução no porta: ' + port);
            })
        )
    })
    .catch(() => {
        console.log('db no connected')
    })


