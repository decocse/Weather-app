
const express= require("express");
const https=require("https");
const bodyParsar=require("body-parser");
const app=express();
app.use(bodyParsar.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});
 app.post("/",function(req,res){
    //console.log(req.body.cityName);
    const cn=req.body.cityName;
    const appkey="64dc85d10cb285d0aa07a6fce83e26d5";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cn +"&appid=" +appkey+ "&units="+unit;
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const weatherdata=JSON.parse(data);
      const hok= weatherdata.main.temp;
        const ki=weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon;
      const img=" http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>Welcome to Debanjan's weather app</h1>");
      res.write("<h2>the weather temperature is " +   hok + " degree centrigrade</h2>");
      res.write("<p>the description is "+ ki +"</p>");
      res.write("<img src="+img+">");
      res.send();
      })
    })
 })

app.listen(3000,function(){
  console.log("cholche cholbe");
})
