const express=require("express");
const request=require ("request");
const app=express();
const https =require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { rmSync } = require("fs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.get("/", function(req, res)
{
res.sendFile(__dirname+ "/signup.html")
});

app.post("/", function(req, res)
{
    var fname=req.body.fname; 
    var lname=req.body.lname;
    var email=req.body.email;
    var pass=req.body.password;
    console.log(fname, lname, email, pass);

const data =
{
    members:
    [
        {
        email_address:email, 
        status: "subscribed", 
        merge_fields:
        {
            FNAME:fname,
            LNAME:lname
        }
  }
  ]
}
 
const jData=JSON.stringify(data);

const url=" https://us21.api.mailchimp.com/3.0/lists/b3c34e074d";
const options=
{
    method:"POST" , auth:"akshay:6c4face149d0d5915f3a327d381cbee7-us21"
}

const request=https.request(url, options, function(response)
{
    if(response.statusCode==200)
        res.sendFile(__dirname+ "/success.html")
        else 
        res.sendFile(__dirname+ "/fail.html")
response.on("data", function(data)
{
    console.log(JSON.parse(data))
})
})
request.write(jData);
request.end();
})
app.post("/fail", function(req, res)
{
    res.redirect("/")
})

app.listen((process.env.PORT || 3000), function()
{
    console.log("server is runing on port 3000");

});

//api key 
//6c4face149d0d5915f3a327d381cbee7-us21
//list id
//b3c34e074d