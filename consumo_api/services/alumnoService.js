const axios = require("axios");
module.exports={

    get:async function(codigo){
        const {data} = await axios.get("http://alumno_api:8080/alumno/"+codigo);
        return data; 
    },
}