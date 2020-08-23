const express = require("express");
const bodyParser =require("body-parser");
const app = express();
const fs = require('fs')
const mongoose=require("mongoose");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/IceDb",{ useUnifiedTopology: true,useNewUrlParser: true });
const iceSchema = new mongoose.Schema({
  email:
  {
    type:String
  },
  password:
  {
    type:String
  },
  createdDate:{
    type:Date,
    default:Date.now
  }
});
const dataentrys = mongoose.model("dataentry",iceSchema);
app.listen(3000,function(req,res){
  console.log("server started on port 3000");
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.get("/signup",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/signin",function(req,res){
  let emailid = req.body.emailid;
  let emailpwd = req.body.emailpwd;
  console.log(emailid,emailpwd);
  let arr =[{email:emailid,password:emailpwd}];
//   dataentry.insertMany(arr,function(err,out){
//     if(err)
//     {
//       console.log(err);
//     }
//     else
//     {
//       console.log("success");
//     }
//     res.send("Success");
//   })
// })
dataentrys.countDocuments({email:emailid,password:emailpwd},function(err,out){
  if(err){
    console.log(err);
  }
  else{
   if(out===0)
   {
     res.send("<body style=background-color:#f4f7c5;><h1 style=text-align:center;margin-top:250px>You are not Authorized</h1></body>");
   }
   else{
     res.redirect("/");
   }
  }
});
});
app.post("/answer",function(req,res){
fs.readFile('Data.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var lines = data.split("\n");
    var randLineNum = Math.floor(Math.random() * lines.length);
    res.send("<body style=background-color:#f4f7c5;><h1 style=text-align:center;margin-top:250px>"+lines[randLineNum]+"</h1></body>");
});
});
