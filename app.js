const cors = require('cors')
const express = require('express');
const { randomUUID } = require("crypto");

const fs = require('fs');
const app = express();

app.use(express.json())

app.use(cors)

let products = [];

fs.readFile("products.json","utf-8",(err,data)=>{
    if(err){
        console.log(err)
    }else{
        products = JSON.parse(data);
    }
});

/**
 * POST 
 * GET
 * PUT
 * DELETE
 */

/**
 * BODY
 * PARAMS
 * QUERY
 */


app.post("/products",(request,response)=>{

    const {name , price} = request.body;
    const id =randomUUID();
    const product ={ 
        id:id.slice(1,7),
         name,
        price

    }

    products.push(product)

   createProductFile();

   return  response.json(product);

});

app.get("/products",(request,response)=>{

    return  response.json(products);

});
 
app.get("/products/:id",(request,response)=>{
  
    const { id } = request.params;
    const product = products.find(product=>product.id === id)
    
    return response.json(product);
}); 

app.put("/products/:id",(request,response)=>{

    const {id} = request.params;
    const { name,price } = request.body;

    const productIndex = products.findIndex((product) => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    };

    createProductFile();
    return response.json({message:"Product updated with success...!"});

});

app.delete("/products/:id",(request,response)=>{

    const {id} = request.params;
    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);

    createProductFile();
   return response.json({ message:"Deleted with success"});


});

function createProductFile(){
  
}

app.listen(4002,()=>console.log("SERVER RUNNING. POST:4002 ...!"));