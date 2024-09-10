const express = require("express");
const router = express.Router();

// index-user 
router.get("/",(req,res)=>{
    res.send("GET for user");
})

// show-user 
router.get("/:id",(req,res)=>{
    res.send("GET for show user");
});

// post-user 
router.post("/",(req,res)=>{
    res.send("post for user");
});

// Delete-user 
router.delete("/:id",(req,res)=>{
    res.send("Delete for user");
});


module.exports = router;