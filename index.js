//pCscFsdMzqAaabls
//Configuração inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();


//Ler Json / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//rota inicial / endpoint
app.get("/", (req, res) => {
  res.json({ messsage: "hello express" });
});

//entregar uma porta
mongoose
  .connect(
    "mongodb+srv://<user>:<password>@apicrudcluster.uhctde3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conectado ao mongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
