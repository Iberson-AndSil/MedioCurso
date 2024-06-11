const express = require("express")
const alumnoService = require("./services/alumnoService");
const uri = 'mongodb+srv://henry23tc:Passw0rd20@comedor.tbubtrv.mongodb.net/'


const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { consumptionModel } = require('./models');
app.get('/', (req, res) => { res.send("I am alive consumption"); })

app.get('/consumption', async(req, res)=>{
  const list = await consumptionModel.find({});
  res.json( list );
});
app.get('/consumption/:codeFood', async(req, res)=>{
  const consumption = await consumptionModel.find({codeFood:req.params.codeFood});
  res.json( consumption );
});
app.post('/consumption', async(req, res)=>{
  try {
    const {codeFood, codigo, typeFood, nameFood} = req.body;
    
    const alumno=await alumnoService.get(codigo);
    console.log("ALUMNO", alumno);
    if(!alumno) throw ("Alumno no encontrado");
    if( alumno.codigo!='NO EXISTE') throw ("ALUMNO NO EXISTE");

    const consumption = new consumptionModel({codeFood, codigo, typeFood, nameFood });
    const data = await consumption.save();
    return res.status(201).json(data);
    

  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

