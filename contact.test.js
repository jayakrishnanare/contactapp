const request = require('supertest');
const app = require('./contact'); 



describe('POST /addcontact', () => {
    it('should create a new user', async () => {
      const newUser = {
        "firstname": "mahindra11",
        "surname": "nandyala",
        "company": "dev2prod",
        "phone": 7033446689,
        "phoneNumberType": "WORK",
        "email": "mahindra@gmail.com",
        "isFav": false
    };
  
      let response1 = await request(app).post('/addcontact').send(newUser);
      expect(response1.body.status).toBe(201);
  //console.log('res',response1._body)
      expect(response1.body.response).toMatchObject({
        "firstname": newUser.firstname,
        "surname": newUser.surname,
        "company": newUser.company,
        "phone": newUser.phone,
        "phoneNumberType": newUser.phoneNumberType,
        "email": newUser.email,
        "isFav": newUser.isFav
      });
    },10000);
  
    // Add more test cases as needed
  });

//get by id test

describe('GET /getcontacts/:id',() => {
  test("it should return with the id",async() => {
    const res = await request(app).get('/getcontacts/64cd085ea5d72d5c115581ed');
    console.log(res)
    expect(res.status).toBe(200);
  })
});

describe('GET /getallcontacts', () => {
  test('should respond with', async() => {
      const response = await request(app).get('/getallcontacts');
      expect(response.status).toBe(200);
      //expect(response.text).toBe("hii good morning")
  })
  
})


// delete

describe('DELETE /deletecontact',()=> {
  test("should dekete a contact",async() => {
    const res = await request(app).delete('/deletecontact/');
    expect(res.status).toBe(404)
  })
})

//update

describe('PUT /updatecontact/:id', () => {
  test("it should update with id", async () => {
    const response = await request(app)
      .put('/updatecontact/64d21a16bc0145830e44c2a7') 
      .send({
        "firstname": "devisriprasadh",
        "surname": "chavadam",
        "company": "dev2prod",
        "phone": 9848511672,
        "phoneNumberType": "WORK",
        "email": "devi@gmail.com",
        "isFav": false
        });
        // console.log(response)
      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe(response.body.firstname);
      expect(response.body.surname).toBe(response.body.surname);
    });
  });


  //fav contacts

  describe('GET /favcontacts',() => {
    test("it should respond witt fav contacts",async () => {
      const response = await request(app).get('/favcontacts');
      console.log(response)
      expect(response.status).toBe(200);

      // const favourateContacts = response.body.filter(contact => contact.isFav);
      // expect(favourateContacts).toHaveLength(0)
    })
  })

//chcking contact

describe('GET //checkcontact/:phone', () => {
    test("it should return with contact", async () => {
        const phoneNumberToCheck = 99080688829;
        const response = await request(app).get(`/checkcontact/${phoneNumberToCheck}`);
        expect(response.status).toBe(200);
        expect(response.body.phone).toBe(response.phoneNumberToCheck)
    });
});

// //sort contacts

describe('GET /sortcontacts',() => {
  test("it should respond to sort",async() => {
    const response = await request(app).get('/sortcontacts');
    expect(response.status).toBe(200);
   
  })
})















//
// describe('PUT /updatecontact/:id',() => {
//   test("it should  update with id",async() => {
//     const res = (await request(app).put('/updatecontact/64cd096ca5d72d5c115581f6')).send({
//       "firstname":"devisriprasadh",
//       "surname":"chavadam"
//     });
//     console.log(res)
//     expect(res.status).toBe(200);
//     expect(res.body.firstname).toBe("devisriprasadh")
//   })
// })

  //test case for get by id
  
  // describe('GET /getcontacts/:id',() => {
  //   it('shollu respond woth id',async() => {
  //       const getdataById = {
  //           "id" : 1
  //       };

  //       let response = await request(app).get('getcontacts/:id').findById(getdataById);
  //       console.log(response)
  //       expect(response.status).toBe(201);
  //       expect(response._body.response).toMatchObject({
  //           "id":getdataById.id
  //       })
  //   })
  // })



//   describe('GET /getcontacts/:id', () => {
//     it('should respond with the contact data for a given ID', async () => {
//         // Assuming you have a valid contact ID in your database
//         const contactId = 1;

//         const response = await request(app).get(`/getcontacts/${contactId}`);

//         expect(response.status).toBe(200);
//         expect(response.body.response).toMatchObject({
//             id: contactId,
//             // ... Other fields you expect to match
//         });
//     });

//     it('should respond with 404 if contact ID is not found', async () => {
//         // Assuming you have a non-existent contact ID
//         const invalidContactId = 999;

//         const response = await request(app).get(`/getcontacts/${invalidContactId}`);

//         expect(response.status).toBe(404);
//     });
// });