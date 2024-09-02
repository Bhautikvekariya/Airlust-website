if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}
const express = require("express");
const http = require('http'); //new
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const Localstrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter =require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bodyParser = require('body-parser');
const server = http.createServer(app);  //new
const socketio=require("socket.io"); //new
const io=socketio(server); //new
const Mongo_url = "mongodb://127.0.0.1:27017/Airlust";
const dbUrl=process.env.ATLASDB_URL;

main()
.then(() => {
        console.log("connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

    async function main() {
        await mongoose.connect(dbUrl);
    }
    
    
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.engine("ejs", ejsMate);
    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.urlencoded({ extended: false }))// parse application/json
  
     io.on("connection",(socket)=>{
        console.log("connected");
     })
    const store = MongoStore.create({
        mongoUrl:dbUrl,
        crypto : {
        secret:process.env.SECRET,
        },
        touchAfter: 24*3600,
    })
     store.on("error",()=>{
        console.log("ERROR IN MONGO SESSION STORE",err);
     })

    const sessionOptions={
        store,
        secret:process.env.SECRET,
        resave:false,
        saveUninitialized: true,
        cookie:{
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
        },
    };
    
    // app.get("/", (req, res) => {
    //     res.send("hii , i am main");
    // });

    
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    
app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

// app.get("/demoUser", async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"hardik patel",

//     });
//    let registeredUser=await User.register(fakeUser,"hello world");
//     res.send(registeredUser);
// });



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
// Reviews 
// post route 

// app.post("/listings",async (req,res)=>{
//     // const {title,description,price,Location,country}=req.body;
//     const newListing= new Listing(req.body.listing);
//    await newListing.save();
//       res.redirect("/listings");
//     });

// app.get("/testlisting",(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new villa",
//         description:"This is my new villa",
//         price: 9000,
//         location:"Calangute,god",
//         country:"India",
//     });

// sampleListing.save();
// console.log("Listing was saved");
// res.send("succesful testing");
// });

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});


app.use((err,req,res,next)=>{
    const {StatusCode=500 ,message="something went wrong!"}=err;
    res.status(StatusCode).render("error.ejs",{message});
});

app.listen(8080, () => {
    console.log("server is running");
});


