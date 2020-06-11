// jshint esversion 6

const express = require("express");
const bodyParser =require("body-parser");
const request = require("request");
const https = require("http");




const newsapp = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({entended: true}));

newsapp.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

newsapp.post("/", function(req, res){

  let firstName = req.body.fName;
  let lastName = req.body.LName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscirbe",
        merge_fields: {
          fNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/ad0fe8d177";

  const options = {
    method: "POST",
    auth:"jamie1:6166e663547ebe7ef9b615b382601a8b-us10"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();

  // console.log(firstName, lastName, email);

});

// {"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}

newsapp.post("/failure", function(req, res){
  res.redirect("/")
})

newsapp.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


//api key 6166e663547ebe7ef9b615b382601a8b-us10
// unique id for audience ad0fe8d177