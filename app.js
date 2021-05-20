const path = require('path')
const http = require('http')
const express = require('express')
 const app = express();
 const hostname = '0.0.0.0';
 const port = process.env.PORT || 3000;
 const hbs= require('hbs')
 const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
//   express.static(path.join(__dirname, '/new gi'));
 const mongoose = require('mongoose')
//  const router = express.Router()
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')

app.use(express.static("public"));


 mongoose.connect('mongodb+srv://pulkit:shraddhap@cluster0.hochl.mongodb.net/survey?retryWrites=true&w=majority', {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false

 }).then(con=>{
    //  console.log(con.connections)
     console.log('Datatabase connection successful');
 })

//  contant from login-projects


const registerSchema = new mongoose.Schema({

    Name:{
        type: String,
        required: true
    },
    Email:{
       type: String,
       required: true,
       unique:true
    },
    number:{
      type: Number ,
      required:true,
      unique:true
    },
    Password:{
        type: String,
        required:true
    }   
   })

   registerSchema.pre('save', async function(next){
     
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.Password, salt);
   this.Password = hashedPassword;
   next();
   })
   
   registerSchema.methods.correctPassword = async function(candidatePassword , userPassword){
    return await bcrypt.compare(candidatePassword , userPassword );
   }



   const register = mongoose.model( 'register', registerSchema);

   
   
//    app.engine('handlebars', hbs.engine);
   app.set('view engine', 'hbs')
   app.set('views', 'views')

   app.use(cookieParser())
   
   app.get('/login', (req,res,next)=>{
  
    res.render('login');
 
   })
   
   
   app.get('/register', (req,res,next)=>{
  
    res.render('register');
 
   })
   app.post('/register',(req,res,next)=>{
  
         let userName = req.body.fullName;
         let useremail = req.body.Email;
         let userMobile = req.body.mobileNumber;
         let userPassword = req.body.password;
         
         const user = new register({
             Name: userName,
             number: userMobile,
             Email: useremail,
             Password: userPassword
         })
         


         user.save().then(doc=>{
             console.log(doc);
         
             const token = jwt.sign({id: user.__id}, 'mynameispulkitupadhyayfromharda', {
                 expiresIn: "10d"
             })
             res.cookie("Token", token , { httpOnly: true, maxAge: 1.728e+8})
             res.redirect('/HomePage')
        
 

 })
 
 
 
 })

//  app.post('/homepage',async function(req,res,next){

    //  let Email = req.body.loginEmail;
    //  let logPassword = req.body.loginPassword;
     
    // logi= await register.findOne({Email})

//  })
app.post('/login',  async (req,res,next) => {

    const {Email, password}= req.body;

    if(!Email || !password){
        return next('please enter valid email or password sp fdf');
    }

// cheaking if the email exist in database

const User = await register.findOne({Email});
console.log(User.Password)
//  const correct = await User.correctPassword(password,User.password )

  if(!User || !(await User.correctPassword(password, User.Password))){
      return next('enter the correcr cridentals');
  }
console.log(User);

const token = await jwt.sign({id: User.__id}, 'mynameispulkitupadhyayfromharda', {
    expiresIn: "10d"
})
  res.cookie("Token", token , { httpOnly: true , maxAge: 1.728e+8})
  res.redirect('/HomePage')
}

 )

 
    //  app.get('/home', protect, (req,res,next)=>{
    //   jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
    //       if(err){
    //           res.sendStatus(403)
    //       }else{
    //         res.render('home.hbs')
    //       }
    //   })
        
    //     // console.log(req.headers)
    // })
 
    
    
app.post('/logout' , (req,res,next)=>{
    jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          res.clearCookie('Token');
          res.redirect('/login');
        }
    })
      
      // console.log(req.headers)
  })

    




// here contant of login project ends








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



app.get('/user/contactUus', protect, (req,res,next)=>{
    jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          res.render('contactUus.hbs')
        }
    })
      
      // console.log(req.headers)
  })

app.get('/suggetions', protect, (req,res,next)=>{
    jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          res.render('suggetions.hbs')
        }
    })
      
      // console.log(req.headers)
  })

  app.get('/survey', protect, (req,res,next)=>{
    jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          res.render('surveyForm.hbs')
        }
    })
      
      // console.log(req.headers)
  })

app.get('/HomePage', protect, (req,res,next)=>{
    jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          res.render('HomePage.hbs')
        }
    })
      
      // console.log(req.headers)
  })

app.get('/NGOs', protect,  (req,res,next)=>{
    jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          res.render('NGO.hbs')
        }
    })
      
      // console.log(req.headers)
  })


app.get('/ourworks', protect, (req,res,next)=>{
    jwt.verify(req.cookies.Token,'mynameispulkitupadhyayfromharda',(err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
          res.render('ourWorks.hbs')
        }
    })
      
      // console.log(req.headers)
  })


app.get('/',  (req,res,next)=>{
        
    res.render('login.hbs')
        

      
      // console.log(req.headers)
  })


app.post('/suggetions', function(req,res,next){

    let Name = req.body.name;
    let suggetion2= req.body.suggetion;
    res.redirect('/HomePage')
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
res.redirect('/HomePage')
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

// the protact function
async function protect (req,res,next){
        
    let token = req.cookies.Token;
    if(!token){
        res.sendStatus(403)
    }else{
        next();     
    }
    
    
    
   
         }

app.listen(port,hostname, ()=>{

    console.log(`app is listening on port ${port}`)
 });