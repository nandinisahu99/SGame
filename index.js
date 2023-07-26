const express=require("express");
const db=require("./routes/db-config");
const app= express();
const cookie=require("cookie-parser");
const PORT=process.env.PORT || 5000;
app.use("/js",express.static(__dirname + "/public/js"))
app.use("/css",express.static(__dirname + "/public/css"))
app.set("view engine","ejs");
app.set("veiws","./views");
app.use(cookie());
app.use(express.json());
db.connect((err)=> {
    if(err)
        throw err;
    console.log("database connected");
})
app.use("/",require("./routes/page"));
app.use("/api",require("./controller/auth"));
app.listen(PORT);
