const request = require('supertest');
const app = require('./contact'); 

describe('GET /getallcontacts', () => {
    it('should respond with "good morning', async() => {
        const response = await request(app).get('/getallcontacts');
        expect(response.status).toBe(200);
        //expect(response.text).toBe("hii good morning")
    })
    
})

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
      expect(response1._body.status).toBe(201);
  //console.log('res',response1._body)
      expect(response1._body.response).toMatchObject({
        "firstname": newUser.firstname,
        "surname": newUser.surname,
        "company": newUser.company,
        "phone": newUser.phone,
        "phoneNumberType": newUser.phoneNumberType,
        "email": newUser.email,
        "isFav": newUser.isFav
      });
    });
  
    // Add more test cases as needed
  });


//   describe('GET /getcontacts/:id',() => {
//     test('should respond with with id', async() => {
//         let contactID = {
//             id : 1
//         }
//         let response = await request(app).get('/getcontacts/${contactID}');
//         expect(response._body.status).toBe(200);
//         expect(response._body.response).toMatchObject({
//             id: contactID.id
//         })
//     })
//   })