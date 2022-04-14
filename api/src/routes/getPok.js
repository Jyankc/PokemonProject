const fetch = require('node-fetch')
var express = require('express');
// const Pokemon = require('../models/Pokemon');
var router = express.Router();
const db = require('../db.js');

router.get('/pokemons/types',async (req,res)=>{
    const types = await db.Types.findAll();
    
    if(types.length){ 
    try{
    console.log("All TYPES:", JSON.stringify(types, null, 2));    
    return res.json(types)   }
    catch(err){
    console.error ('ERROR EN EL TYPES.LENGTH' + err)
    }
    }

    else{
    fetch('https://pokeapi.co/api/v2/type')
    .then(data=> data.json())
    .then(object=>{
     let array1=[...object.results].map((el)=>{return el={name: el.name}})  
     return array1
    })
    .then(formattedArr=>db.Types.bulkCreate(formattedArr))
    .then(()=> db.Types.findAll())
    .then(types=>res.status(201).json(types))
    .catch(err=>{
        console.error('ERROR ENCONTRADOO EN EL FETCH' + err)
        res.status(500).send("Something went TERRIBLY WRONG")
    })
    }


})
   
router.post('/pokemons/bulk' , (req,res)=>{
    const array1= req.body
    db.Pokemon.createBulk(array1)
    .then(pokemon=>{
        res.status(201).json(pokemon)})
    .catch(err=>{
        console.error('ERROR ENCONTRADOO' + err)
        res.status(500).send("Something went TERRIBLY WRONG")

    })
})

router.post('/pokemons' , (req,res)=>{
    const{name,img,hp,attack,defense,speed,height,weight} = req.body
    db.Pokemon.create({name,img,hp,attack,defense,speed,height,weight})
    .then(pokemon=>{
        res.status(201).json(pokemon)})
    .catch(err=>{
        console.error('ERROR ENCONTRADOO' + err)
        res.status(500).send("Something went TERRIBLY WRONG")

    })


    

})



router.get('/pokemons', async (req, res) => {
    const {page,name} = req.query;
    if (name){
    const target = await db.Pokemon.findOne({ where: { name: name }})
        if (target){
        res.json(target)
        }
        else{
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(result=>result.json())
        .then(poke=>{
           const poke3={
                id:poke.id,
                name:poke.name,
                types:poke.types.map(el=>el.type.name),
                img:poke.sprites.other['official-artwork'].front_default,
                hp:(poke.stats.filter(el=> {
                    if(el.stat.name==='hp'){return el.base_stat} 
                }))[0]['base_stat'],
                attack:(poke.stats.filter(el=> {
                    if(el.stat.name==='attack'){return el.base_stat} 
                }))[0]['base_stat'],
                defense:(poke.stats.filter(el=> {
                    if(el.stat.name==='defense'){return el.base_stat} 
                }))[0]['base_stat'],
                speed:(poke.stats.filter(el=> {
                    if(el.stat.name==='speed'){return el.base_stat} 
                }))[0]['base_stat'],
                height:poke.height,
                weight:poke.weight
            }
            return poke3 })
        .then(data=>res.json(data))
        .catch(err=> res.json({Error: err} , { Message: 'El pokemon no fue encontrado'}))
        }
    }
    else{
    const arrayUrl = [];
    const firstPokemon = (page * 20) - 19;
    for(i=firstPokemon; i < firstPokemon+20; i++) {
        arrayUrl.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }



    const promises = arrayUrl.map(url => fetch(url));
    Promise.all(promises)
    .then(responses=>Promise.all(responses.map(el=>el.json())))
    .then(array=>{
        const array2=array.map(poke=>{
           return  {name:poke.name,
            id:poke.id,
            types:poke.types.map(el=>el.type.name),
            img:poke.sprites.other['official-artwork'].front_default
            }
        })
    
        res.json(array2)
    
    }).catch(err=>res.json(err)) 
}

}) 

router.get('/pokemons/:id', (req, res) => {
    const {id}=req.params
    if (isNaN((Number(id)))){return res.status(402).json({error:"Please insert a number"})}
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(result=>result.json())
    .then(poke=>{
       const poke2={
            id:poke.id,
            name:poke.name,
            types:poke.types.map(el=>el.type.name),
            img:poke.sprites.other['official-artwork'].front_default,
            hp:(poke.stats.filter(el=> {
                if(el.stat.name==='hp'){return el.base_stat} 
            }))[0]['base_stat'],
            attack:(poke.stats.filter(el=> {
                if(el.stat.name==='attack'){return el.base_stat} 
            }))[0]['base_stat'],
            defense:(poke.stats.filter(el=> {
                if(el.stat.name==='defense'){return el.base_stat} 
            }))[0]['base_stat'],
            speed:(poke.stats.filter(el=> {
                if(el.stat.name==='speed'){return el.base_stat} 
            }))[0]['base_stat'],
            height:poke.height,
            weight:poke.weight
        }

        return poke2


        })
    .then(data=>res.json(data))

})


// [ ] POST /pokemons:
//     Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
//     Crea un pokemon en la base de datos





// })














    

module.exports=router;

