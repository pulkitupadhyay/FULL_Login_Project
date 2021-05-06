const path = require('path')
const http = require('http')
const express = require('express')
 const app = express();
 const hostname = '0.0.0.0';
 const port = process.env.PORT || 3000;

var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
//   express.static(path.join(__dirname, '/new gi'));
 const mongoose = require('mongoose')
//  const router = express.Router()



 mongoose.connect('mongodb+srv://pulkit:shraddhap@cluster0.hochl.mongodb.net/survey?retryWrites=true&w=majority', {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false

 }).then(con=>{
    //  console.log(con.connections)
     console.log('Datatabase connection successful');
 })

const surveySchema = new mongoose.Schema({
 name:{
     type: String,
     required: true
 },
 email:{
    type: String,
    required: true
    
 },
 Do_you_think_prople_are_aware_of_what_the_swacchh_bharat_mission_means:{
    type: Boolean,
    required: true
 },
 Do_you_think_awareness_about_cleanliness_is_needed:{
    type: Boolean ,
    required: true
 },
 How_clean_your_surrounding_is:{
    type: String,
    required: true
 },
 Did_you_ever_take_the_initiative_regarding_clean_India:{
    type: Boolean,
    required: true
 },
 Whats_your_motto_to_visit_this_website:{
 type: String,
 required: true

 }

})
const suggetionSchema = new mongoose.Schema({

 Name:{
     type: String,
     required: true
 },
 suggetion:{
    type: String,
    required: true
 }

})
const Survey = mongoose.model( 'Survey', surveySchema);
const Suggetion = mongoose.model( 'Suggetion', suggetionSchema);



app.get('/user/contactUus', (req,res,next)=>{

    res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','contactUus.html'))

})
app.get('/HomePage',  (req,res,next)=>{

    // console.log(req.body)
    res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','HomePage.html'))

})
app.get('/NGOs',  (req,res,next)=>{

    // console.log(req.body)
    res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','NGO.html'))

})

app.get('/ourworks',  (req,res,next)=>{

    // console.log(req.body)
    res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','ourWorks.html'))

})
app.get('/suggetions',  (req,res,next)=>{

    res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','suggetions.html'))
    
    })
app.get('/', (req,res,next)=>{

    // console.log(req.body)
    res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','surveyForm.html'))

})

app.post('/HomePage', function(req,res,next){

    let Name = req.body.name;
    let suggetion2= req.body.suggetion;
res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','HomePage.html'))
        const suggetion1 = new Suggetion({
            Name: Name,
            suggetion: suggetion2
        })
        suggetion1.save().then(doc=>{
            console.log(doc);
        })
       



})
app.post('/HomePage', function(req, res,next) {
 let NAME = req.body.name;
 let EMAIL = req.body.email;
 let que1 = req.body.que1;
 que2 = req.body.que2;
 que3 = req.body.que3;
 que4 = req.body.que4;
 que5 = req.body.que5;
res.sendFile(path.join(__dirname,'../','new-git-repo', 'views','HomePage.html'))
const testSurvey = new Survey({
    name: NAME,
    email: EMAIL,
    Do_you_think_prople_are_aware_of_what_the_swacchh_bharat_mission_means: que1,
    Do_you_think_awareness_about_cleanliness_is_needed : que2,
    How_clean_your_surrounding_is: que3,
    Did_you_ever_take_the_initiative_regarding_clean_India : que4,
    Whats_your_motto_to_visit_this_website : que5,
    

    })
    
    testSurvey.save().then(doc =>{
        console.log(doc);
    })
    

}

)


app.listen(port,hostname, ()=>{

    console.log(`app is listening on port ${port}`)
 });