const express = require("express");
const https = require("https");

const app= express();


app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/weather",(req,res)=>{
    const city=req.body.cityname;
    const country = req.body.countryname;
    const APIKEY = "f96a6e96f2a97fd8fade00fadda135f1";
     const dataurl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKEY}`
     
    
    https.get(dataurl,(resp)=>{
        resp.on("data",(data)=>{
            const weather = JSON.parse(data);
            const desc = weather.weather[0].description;
            const maxtemp = Math.floor(weather.main.temp_max - 273.15);
            const mintemp = Math.floor(weather.main.temp_min - 273.15);

            const iconurl="https://openweathermap.org/img/wn/" + `${weather.code !== 404 ? weather.weather[0].icon : null}` + ".png"
            res.render("display",{city,desc,maxtemp,mintemp,iconurl});
        })
     })
     
})

app.listen(3000,()=>{
    console.log("Working in 3000");
})