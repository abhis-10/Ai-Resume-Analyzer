// const fs = require("fs");
// const path = require("path");
// const parsePDF = require("../utils/pdfParser");
// const analyzeResume = require("../services/ai.service");
// async function resumeRoutes(fastify, options){

//     fastify.post("/upload", async(req,res) =>{
//         try{
//             const data = await req.file();
//             console.log("------------->" + JSON.parse(data));
//             const userQuery = data.fields.query.value;
//             console.log("-------XXXX----->" + JSON.parse(userQuery));
//             const fileName = Date.now() + path.extname(data.filename || ".pdf");
//             const filePath = path.join(__dirname, "../../uploads",fileName);

//             await new Promise((resolve, reject)=>{
//                 const writeStream = fs.createWriteStream(filePath);
//                 data.file.pipe(writeStream);
//                 data.file.on("end",resolve);
//                 data.file.on("error",reject);
//             });

//             const resumetext = await parsePDF(filePath);  
//             const aiResult = await analyzeResume(resumetext,userQuery);
//             const aiParsedInfo = JSON.parse(aiResult);

//             return {
//                 message : "Done.",
//                 filename: fileName,
//                 query: userQuery,
//                 analysis: aiParsedInfo
//             }
//         }catch(err){
//             return res.status(500).send({ error : err.message})
//         }
//     });
// }

// module.exports = resumeRoutes;
const fs = require("fs");
const path = require("path");
const parsePDF = require("../utils/pdfParser");
const analyzeResume = require("../services/ai.service");

async function resumeRoutes(fastify, options) {

  fastify.post("/upload", async (req, reply) => {
    try {
      // 1️⃣ File handle
      const data = await req.file(); // single file
      if (!data) {
        return reply.status(400).send({ error: "File is required" });
      }

      const fileName = Date.now() + path.extname(data.filename || ".pdf");
      const filePath = path.join(__dirname, "../../uploads", fileName);

      // 2️⃣ Save file safely
      await new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(filePath);
        data.file.pipe(ws);
        ws.on("finish", resolve);
        ws.on("error", reject);
      });

      // 3️⃣ Text field handle
      // Note: req.body only works if you use content-type urlencoded/json
      let userQuery = "";

// Check if fields exist (Fastify multipart exposes it via data.fields or req.parts())
if (data.fields && data.fields.query) {
  userQuery = data.fields.query.value;
}

      // 4️⃣ Parse PDF
      const resumeText = await parsePDF(filePath);

      // 5️⃣ AI analysis
      const aiResult = await analyzeResume(resumeText, userQuery);

      let aiParsedInfo;
      try { aiParsedInfo = JSON.parse(aiResult); } 
      catch { aiParsedInfo = aiResult; }

      return {
        message: "Done ✅",
        filename: fileName,
        query: userQuery,
        analysis: aiParsedInfo,
      };

    } catch (err) {
      return reply.status(500).send({ error: err.message });
    }
  });
}

module.exports = resumeRoutes;