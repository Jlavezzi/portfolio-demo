const express = require('express');

const app = express();

const bodyParser = require('body-parser')
const https = require('https');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile( __dirname +'/index.html')
});

app.post('/' ,function(req, res){
// using body parser to get data from html form

  const email = req.body.email;

//collecting and preparing the data to be transfered to mailchimp using parameters that the mailchimp servers will understand
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',

      }
    ]
  };
  //converting mailchimp compatible data form to string
  const jsonData = JSON.stringify(data)

   const url ='https://us7.api.mailchimp.com/3.0/lists/5f52755504';


//necesary parameters to post
   const options = {
     method:'POST',
     auth:'Adejare:b1aea2232181e829959480bebc6d65b8-us7'
   }
   //
 const request =  https.request(url, options, (response)=>{
      response.on('data', function(data){

      if(response.statusCode === 200){
        res.sendFile(__dirname +'/success.html')
      } else {
         res.sendFile(__dirname +'/failure.html')
      }


      })
  })
  //send data to mailchimp
 request.write(jsonData);
  request.end();
})

app.listen(3000, function(){
  console.log('server is ready')
})
