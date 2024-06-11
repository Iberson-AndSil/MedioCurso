const express = require("express")
const loanService = require("./services/alumnoService");
const uri = 'mongodb+srv://henry23tc:Passw0rd23@comedor.tbubtrv.mongodb.net/'


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
    const {codeFood, codeStudent, typeFood, nameFood} = req.body;
    
    const alumno=await alumnoService.get(codeStudent);
    console.log("ALUMNO", alumno);
    if(!alumno) throw ("LOAN_NOT_FOUND");
    if( alumno.status!='PENDING') throw ("LOAN_NOT_PENDING");

    const consumption = new consumptionModel({codeFood, codeStudent, typeFood, nameFood });
    const data = await consumption.save();
    await loanService.changeStatus(codeStudent,'PAID');
    return res.status(201).json(data);
    

  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

