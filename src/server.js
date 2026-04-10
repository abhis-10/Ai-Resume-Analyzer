require("dotenv").config();
const app = require("./app.js");

const start = async () => {
    try{
        await app.listen({ port : 3000});
        console.log("Server running on port 3000");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

start();