const { spec } = require('pactum');

describe("user api", async()=>{

 it("should return 200",async()=>{
    await spec()
    .get('http://localhost:3000/login')
    .withQueryParams({
        email: 'john@example.com',
         password: 'password123'
    })
    .expectStatus(200)
    .expectJson({login: true, cookieSend: true })

 });
 it("should return 404",async()=>{
    await spec()
    .get('http://localhost:3000/login')
    .withQueryParams({
        email: 'jon@example.com',
         password: 'password123'
    })
    .expectStatus(404)
    

 });
 it("password should not match",async()=>{
    await spec()
    .get('http://localhost:3000/login')
    .withQueryParams({
        email: 'john@example.com',
         password: 'password1'
    })
    .expectStatus(404)
    

 });







})