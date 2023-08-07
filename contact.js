const mongoose = require("mongoose");
const express = require("express");
const ContactDetails = require('./shema')
const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://jayakrishnanare:BQTFTGmnLY3qWEbv@cluster0.mbdeahy.mongodb.net/"
  )
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hii good morning");
});


//creating data 

app.post('/contact', async(req,res)=>{
    const {firstname,surname,company,phone,phoneNumberType,email, isFav} = req.body
    try{
        const data = new ContactDetails({firstname,surname,company,phone,phoneNumberType,email,isFav});
        await data.save();
        return res.send(await ContactDetails.find())
    }
    catch(err){
        console.log(err.message)
    }
});

// getting  Alldata 

app.get('/getcontacts',async (req,res) => {
    try{
        const getdata = ContactDetails.find();
        return res.send(await getdata)
    }
    catch(err){
        console.log(err.message)
    }
})

//getting data by id

app.get('/getcontacts/:id',async (req,res) => {
    try{
       const getdataById = ContactDetails.findById(req.params.id) ;
       return res.send( await getdataById)
    }
    catch(err){
        console.log(err.message)
    }
})

//deletiing contact by id
app.delete('/deletecontact/:id',async(req,res) => {
    try{
        const deletedata = ContactDetails.findByIdAndDelete(req.params.id);
        return res.send(await deletedata.find())
    }
    catch(err){
        console.log(err.message)
    }
})

//updating the data


app.put('/updatecontact/:id', async (req,res) => {
    const {firstname,surname,company,phone,phoneNumberType,email, isFav} = req.body
    try{
        const update = await ContactDetails.findByIdAndUpdate(req.params.id , {firstname,surname,company,phone,phoneNumberType,email, isFav} , {new:true})
        return res.send(update)
    } catch(err){
        console.log(err.message)
    }
})

//
app.get('/favcontacts', async(req,res)=> {
    try{
        const favcontacts = await ContactDetails.find({isFav : true})
        return res.send(favcontacts)
    }
    catch(err){
        console.log(err.message)
    }
});


//checking if the number is alreday existed or not

app.get('/checkcontact/:phone', async (req, res) => {
    try {
      const phone = req.params.phone;
      const existingContact = await ContactDetails.findOne({ phone: phone });
      
      if (existingContact) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  //sorting the contact list

  app.get('/sortcontacts', async(req,res) => {
    try{
        const sortContacts = await ContactDetails.find().sort({firstname : 1})
        return res.send(sortContacts)
    }
    catch(err){
        console.log(err.message)
    }
  })



app.listen(3000, () => console.log("server is running"));
