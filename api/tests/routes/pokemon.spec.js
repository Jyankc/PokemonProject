/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');


const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  const objPost={
    "name": "Bebe",
    "img": "https://www.profesionalreview.com/wp-content/uploads/2017/05/Pronto-podr%C3%A1s-atrapar-los-pokemon-legendarios-1.jpg",
    "hp": 1020,
    "attack": 270,
    "defense": 90,
    "speed": 60,
    "height": 100,
    "weight": 90,
    "types":[1,5]
  }
  
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(()=>agent.get('/pokemons/types')) ///
    .then(() => Pokemon.create(pokemon)))
    
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  it('/POST Should get 201', async () => {
        await agent
        .post('/pokemons')
        .send(objPost)
        expect(201)
    
    })
        
       
  it('/POST Should get Status code 502 because no type was inserted', async () => {
      const res= await session(app)
        .post('/pokemons')
        .send({
        "name": "Oreos",
        "img": "https://www.profesionalreview.com/wp-content/uploads/2017/05/Pronto-podr%C3%A1s-atrapar-los-pokemon-legendarios-1.jpg",
        "hp": 1020,
        "attack": 270,
        "defense": 90,
        "speed": 60,
        "height": 100,
        "weight": 90,
        "types":[]
        })
        expect(res.status).to.be.equal(502);
        

        
        
       
   
  })
});
