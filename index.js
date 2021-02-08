// fetch function

async function getPokemon(input) {
    let pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + input);
    return await pokemon.json();
}

async function getSpecies(pokemon){
    let species = await fetch(pokemon.species.url);
    return await species.json();
}

async function getEvolutionChain(url){
    let evolutionChain = await fetch(url);
    return await evolutionChain.json();
}

document.addEventListener("DOMContentLoaded", function(event){
document.getElementById('run').addEventListener('click', async () => {

    let input = document.getElementById("pokemon-id").value;
    let pokemon = await getPokemon(input);


        let theMoves = pokemon.moves;
        let moveLimit = theMoves.sort(() => 0.5 - Math.random());
        //let moves = moveLimit.slice(0, 4);
        let id = pokemon.id;
        let name = pokemon.name;
        let imgSrc = pokemon.sprites.front_default;

    let target = document.getElementById("tpl-pokemon");


    target.querySelector('.name').innerHTML = name;
    target.querySelector(".ID-number").innerHTML = id;
    document.getElementById("img-pokemon").src = imgSrc;

    pokemonResult.querySelector('.name').innerHTML = name;
    pokemonResult.querySelector('.img-pokemon').innerHTML = img;
    pokemonResult.querySelector(".ID-number").innerHTML = id;
    // pokemonResult.querySelector('.moves').innerText = pokemon.abilities.name;

    // Marte's evolution function

    let species = await getSpecies(pokemon);

    // show name and picture of previous evolution
    if(species.evolves_from_species != null){

        let evolution = species.evolves_from_species.name;
        let evolutionPokemon = await getPokemon(evolution);

        target.querySelector(".prev-evolution").innerHTML = evolution;

        document.getElementById("img-prev-evolution").src = evolutionPokemon.sprites.front_default;
    }
    else{
        target.querySelector(".prev-evolution").innerHTML = "There is no previous evolution";
    }

    // show pictures of next evolutions
    let evolutionUrl = species.evolution_chain.url;
    let evolutionChain = await getEvolutionChain(evolutionUrl);

    console.log(evolutionChain);

    let evolution1 = evolutionChain.chain.evolves_to[0];
    console.log(evolution1.species);

    let evolution2 = evolution1.evolves_to[0];
    console.log(evolution2.species);




    // Julio's moves function




})})