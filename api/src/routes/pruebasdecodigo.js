var page=1
const fetch = require('node-fetch')
const arrayUrl = [];
const firstPokemon = (page * 20) - 19;
for(i=firstPokemon; i < firstPokemon+20; i++) {
    arrayUrl.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
}

const promises= arrayUrl.map(url => fetch(url)); 
const array2=[]
Promise.all(promises).then(element=>element.map(el=>array2.push(el)))
console.log(array2)

    



// var pepe=(({name,id,types})=>({name,id,types}))(obj1)


// var array=[{name:'pikachu', types:[ {type:{name:'fire'}}, {type:{name:'fire'}}], height:100, id:1,weight:200, levels:{}},
// {name:'geodude', types:[ {type:{name:'water'}}, {type:{name:'plant'}}], height:200, id:2,weight:200, levels:{}},
// {name:'pigeot', types:[ {type:{name:'wind'}}, {type:{name:'light'}}], height:100, id:3,weight:200, levels:{}}]
// console.log(array)

// var array2= array.map(function(el){
//     return (({name,id,types})=>({name,id,types}))(el)
// })

// console.log(array2)