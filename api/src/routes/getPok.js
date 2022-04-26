const fetch = require('node-fetch')
var express = require('express');
// const Pokemon = require('../models/Pokemon');
var router = express.Router();
const db = require('../db.js');
const { Op } = require('sequelize')
const URL= process.env.REACT_APP_API || 'https://localhost:3001'
router.get('/pokemons/types', async (req, res) => {
    const types = await db.Types.findAll();

    if (types.length) {
        try {
            return res.json(types)
        }
        catch (err) {
            console.error('ERROR EN EL TYPES.LENGTH' + err)
        }
    }

    else {
        fetch('https://pokeapi.co/api/v2/type')
            .then(data => data.json())
            .then(object => {
                let array1 = [...object.results].map((el) => { return el = { name: el.name } })
                return array1
            })
            .then(formattedArr => db.Types.bulkCreate(formattedArr))
            .then(() => db.Types.findAll())
            .then(types => res.status(201).json(types))
            .catch(err => {
                console.error('ERROR ENCONTRADOO EN EL FETCH' + err)
                res.status(500).send("Something went TERRIBLY WRONG")
            })
    }


})


router.post('/pokemons/bulk', async (req, res) => {
    const created = req.body



    const results =  created.map(async el => {
        const newPoke = await db.Pokemon.create(el)
        await newPoke.addTypes(el['types'])
        return newPoke
    })
    // console.log(created)
    res.status(201).json({ Message: 'Pokemones Creados' })



})

router.post('/pokemons', async (req, res) => {

    const {types, name } = req.body
    if (!types || !name || types.length === 0) { return res.status(502).json({ Error: 'types or names cannot be undefined' }) }
    else if (await db.Pokemon.findOne({ where: { name: name } })) { return res.status(403).json({ Error: 'Pokemon already exists' }) }
    else {
        const created = await db.Pokemon.create(req.body)
        await created.addTypes(types)
        res.status(201).json(created)
    }

})

router.get('/pokemons', async (req, res) => {
    const { name } = req.query;
    if (name) {
        const target = await db.Pokemon.findOne({
            where: { name: { [Op.iLike]: name } },
            include: [{
                model: db.Types,
                through: { attributes: [] },
                attributes: ['name']
            }],

        })
        if (target) {
            const typo = await target.toJSON()
            typo.types = typo.types.map(x => { return x.name })
            res.json(typo)
        }
        else {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const poke = await result.json()

                const poke3 = {
                    id: poke.id,
                    name: poke.name,
                    types: poke.types.map(el => { return el.type.name }),
                    img: poke.sprites.other['official-artwork'].front_default,
                    hp: (poke.stats.filter(el => {
                        if (el.stat.name === 'hp') { return el.base_stat }
                    }))[0]['base_stat'],
                    attack: (poke.stats.filter(el => {
                        if (el.stat.name === 'attack') { return el.base_stat }
                    }))[0]['base_stat'],
                    defense: (poke.stats.filter(el => {
                        if (el.stat.name === 'defense') { return el.base_stat }
                    }))[0]['base_stat'],
                    speed: (poke.stats.filter(el => {
                        if (el.stat.name === 'speed') { return el.base_stat }
                    }))[0]['base_stat'],
                    height: poke.height,
                    weight: poke.weight
                }
                return res.json(poke3)


            }
            catch (err) {
                return res.status(404).json({ Error: 'Pokemon not found' })
            }
        }
    }


    else {
            const myPoke = await db.Pokemon.findAll({
                include: [{
                    model: db.Types,
                    through: { attributes: [] },
                    attributes: ['name']
                }],
                attributes: ['name', 'uuid', 'img', 'attack']
            })
            const myPoke2 = myPoke.map(el => {
                const obj = {
                    name: el.name,
                    uuid: el.uuid,
                    img: el.img,
                    types: el.types.map(el => { return el.name }),
                    attack: el.attack

                }
                return obj
            })



            const arrayUrl = []
            for (i = 1; i <= 40; i++) {
                arrayUrl.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
            }


            const promises = arrayUrl.map(url => fetch(url));
            Promise.all(promises)
                .then(responses => Promise.all(responses.map(el => el.json())))
                .then(array => {
                    const array2 = array.map(poke => {
                        return {
                            name: poke.name,
                            id: poke.id,
                            types: poke.types.map(el => el.type.name),
                            img: poke.sprites.other['official-artwork'].front_default,
                            attack: poke.stats[1].base_stat
                        }


                    })
                    const resultFinal = [...myPoke2, ...array2]
                    res.json(resultFinal)
                }).catch(err => res.json(err))



        }
    })

router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params

    if (isNaN((Number(id)))) {  //463f091f-d4ea-406a-a23c-07a604c715e5
        try {
            const target = await db.Pokemon.findOne({
                where: { uuid: id }, include: [{
                    model: db.Types,
                    through: { attributes: [] },
                    attributes: ['name']
                }]
            })
            if (target) {

                const typo = await target.toJSON()
                typo.types = typo.types.map(x => { return x.name })



                return res.json(typo)
            }
        }
        catch (err) {
            return res.status(404).json({ Error: 'Invalid ID ' })
        }
    }
    else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(result => result.json())
            .then(poke => {
                const poke2 = {
                    id: poke.id,
                    name: poke.name,
                    types: poke.types.map(el => el.type.name),
                    img: poke.sprites.other['official-artwork'].front_default,
                    hp: (poke.stats.filter(el => {
                        if (el.stat.name === 'hp') { return el.base_stat }
                    }))[0]['base_stat'],
                    attack: (poke.stats.filter(el => {
                        if (el.stat.name === 'attack') { return el.base_stat }
                    }))[0]['base_stat'],
                    defense: (poke.stats.filter(el => {
                        if (el.stat.name === 'defense') { return el.base_stat }
                    }))[0]['base_stat'],
                    speed: (poke.stats.filter(el => {
                        if (el.stat.name === 'speed') { return el.base_stat }
                    }))[0]['base_stat'],
                    height: poke.height,
                    weight: poke.weight
                }

                return poke2


            })
            .then(data => res.json(data))
            .catch(err=>res.json({Error:'Pokemon not found '}))

    }

})


module.exports = router;

