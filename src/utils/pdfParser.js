const fs = require("fs");
const pdfParse = require("pdf-parse");

const parsePDF = async (filePath) =>{
    try {
        const dataBuffer =  fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text; // resume ka sara text return karega

    } catch (error) {
        throw new Error("Error while parsing pdf: " + error.message);
    }
};

module.exports = parsePDF