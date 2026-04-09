const fs = require("fs");
const path = require("path");

async function resumeRoutes(fastify, options){

    fastify.post("/upload", async(req,res) =>{
        try{
            const data = await req.file();
            const fileName = Date.now() + path.extname(data.filename || ".pdf");
            const filePath = path.join(__dirname, "../../uploads",fileName);

            await new Promise((resolve, reject)=>{
                const writeStream = fs.createWriteStream(filePath);
                data.file.pipe(writeStream);
                data.file.on("end",resolve);
                data.file.on("error",reject);
            });
            return {
                message : "File saved successfully.",
                filename: fileName,
                path: filePath
            }
        }catch(err){
            return res.status(500).send({ error : err.message})
        }
    });
}

module.exports = resumeRoutes;