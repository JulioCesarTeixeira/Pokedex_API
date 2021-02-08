// fetch function

async function getPokemon(input) {
    let pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + input);
    return await pokemon.json();
}

// (async () => {
//
//     let input = "57";
//     let pokemon = await getPokemon(input);
//
//     let id = pokemon.id;
//     let name = pokemon.name;
//     let img = pokemon.sprites.front_default;
//
//     console.log(id, name);
//
//     let image = document.createElement("img");
//     image.src = pokemon.sprites.front_default;
//     document.getElementById("target").appendChild(image);
//
// })();


// async function pokemonInfo()  {
//     const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + input)
//     return await pokemon.json();
// }
// console.log(pokemonInfo());

document.addEventListener("DOMContentLoaded", function(event){
document.getElementById('run').addEventListener('click', async () => {

    let input = document.getElementById("pokemon-id").value;
    let pokemon = await getPokemon(input);

    let id = pokemon.id;
    let name = pokemon.name;

    let img = pokemon.sprites.front_default;

    let image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    document.getElementById("target").appendChild(image);

    let target = document.getElementById("target");
    let template = document.getElementById("tpl-pokemon").content;
    let pokemonResult = template.cloneNode(true);

    pokemonResult.querySelector('.name').innerHTML = name;
    pokemonResult.querySelector('.img-pokemon').innerHTML = img;
    pokemonResult.querySelector(".ID-number").innerHTML = id;
    // pokemonResult.querySelector('.moves').innerText = pokemon.abilities.name;

    // Marte's evolution function




    // Julio's moves function




    target.append(pokemonResult);
})})