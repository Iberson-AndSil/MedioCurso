const express = require("express")
const uri = 'mongodb+srv://henry23tc:Passw0rd20@comedor.tbubtrv.mongodb.net/'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { alumnoModel } = require('./models');
app.get('/', (req, res) => { res.send("Este es el perfil del Alumno"); })

app.get('/alumno', async(req, res)=>{
  const alumno = await alumnoModel.find({});
  res.json( alumno );
});
app.get('/alumno/:codigo', async(req, res)=>{
  const alumno = await alumnoModel.find({codigo:req.params.codigo});
  res.json( alumno );
});
app.get('/alumno/:dni', async(req, res)=>{
  const alumno = await alumnoModel.find({dni:req.params.dni});
  res.json( alumno );
});
app.post('/alumno', async(req, res)=>{
  try {
    const codigo = req.body.codigo;
    const dni = req.body.dni;
    const name = req.body.name;
    const lastname = req.body.lastname;

    const alumno = new alumnoModel({ codigo, dni,name,lastname, birthday});

    const data = await alumno.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

