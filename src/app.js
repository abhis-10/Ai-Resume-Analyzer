require("dotenv").config();
const fastify = require("fastify");
const multipart = require("@fastify/multipart");
const resumeRoutes = require("./routes/resume.routes");

const app = fastify({logger:true});

app.register(multipart);
app.register(resumeRoutes, { prefix: "/api/resume" });

app.get("/", async (req,res)=>{
    return { message: "Server is running."}
});

module.exports = app;