const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ContactDetails = require("./shema");
const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://jayakrishnanare:BQTFTGmnLY3qWEbv@cluster0.mbdeahy.mongodb.net/"
);
//   .then(() => console.log("DB connected..."))
//   .catch((err) => console.log(err));

app.get("/getc", (req, res) => {
  res.send("hii good morning");
});

//creating data

app.post("/addcontact", async (req, res) => {
  const { firstname, surname, company, phone, phoneNumberType, email, isFav } =
    req.body;
  try {
    const data = new ContactDetails({
      firstname,
      surname,
      company,
      phone,
      phoneNumberType,
      email,
      isFav,
    });
    let result = await data.save();
    let status = { status: 201, message: "sucess", response: result };
    //console.log(status);
    return res.send(status);
    // await data.save()
    // return res.send(await ContactDetails.find())
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

// get contact by query params

app.get("/getcontacts", async (req, res) => {
  try {
    let id = req.query.id,
      name = req.query.firstname,
      phonenumber = req.query.phone;
    const getdata = await ContactDetails.find({
      _id: id,
      firstname: name,
      phone: phonenumber,
    });
    // result = getdata
    return res.send(getdata);
    // let result = {status:200,
    //     message : "success",
    //     response : getdata
    // }
    // console.log(result);
    // return res.send(result)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//

app.get("/getallcontacts", async (req, res) => {
  try {
    const getallData = await ContactDetails.find();
    let status = { status: 200, message: "success", response: getallData };
    // console.log(status);
     res.send(status);
    // return res.send(getallData)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

// getting data by id

app.get("/getcontacts/:id", async (req, res) => {
  try {
    const getdataById = await ContactDetails.findById(req.params.id);
    let status = { status: 200, message: "sucess", response: getdataById };
    // console.log(status);
    return res.send(status);
    //    return res.send( await getdataById)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

// deletiing contact by id

app.delete("/deletecontact/:id", async (req, res) => {
  try {
    const deletedata = await ContactDetails.findByIdAndDelete(req.params.id);
    let status = { status: 404, message: "sucess", response: deletedata };
    console.log(status);
    return res.json(status);
    // return res.send(await deletedata)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//updating the data

app.put("/updatecontact/:id", async (req, res) => {
  const { firstname, surname, company, phone, phoneNumberType, email, isFav } =
    req.body;
  try {
    const update = await ContactDetails.findByIdAndUpdate(
      req.params.id,
      { firstname, surname, company, phone, phoneNumberType, email, isFav },
      { new: true }
    );
    let result = { status: 200, message: "sucess", response: update };
    console.log(result);
    return res.send(result);
    // return res.send(update)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

app.get("/favcontacts", async (req, res) => {
  try {
    const favcontacts = await ContactDetails.find({ isFav: true });
    let result = { status: 200, message: "success", response: favcontacts };
    console.log(result);
    return res.send(result);
    // return res.send(favcontacts)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//checking if the number is alreday existed or not

app.get("/checkcontact/:phone", async (req, res) => {
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
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//sorting the contact list

app.get("/sortcontacts", async (req, res) => {
  try {
    const sortContacts = await ContactDetails.find().sort({ firstname: 1 });
    return res.send(sortContacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = app;
app.listen(3000); //=> console.log("server is running");
