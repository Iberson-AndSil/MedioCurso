const axios = require("axios");
module.exports={

    get:async function(code){
        const {data} = await axios.get("http://alumno_api:8080/alumno/"+code);
        return data; 
    },
    changeStatus: async function(code, status){
        const {data} = await axios.put("http://alumno_api:8080/alumno/"+code, {status});
    }
}