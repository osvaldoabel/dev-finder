// query params : request.query (filtros, ordenação, paginaçao, etc...)
//route params:  request.params
// body : request.body

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const routes    = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://osvaldoabel:UkKqqZ3DlUiw2YLM@cluster0-5a3lw.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);