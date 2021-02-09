// fetch function


async function getPokemon(input) {
    let pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + input);
    return await pokemon.json();
}

async function getSpecies(pokemon) {
    let species = await fetch(pokemon.species.url);
    return await species.json();
}

async function getEvolutionChain(url) {
    let evolutionChain = await fetch(url);
    return await evolutionChain.json();
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('run').addEventListener('click', async () => {

        document.getElementById("prev-evolution").classList.add("hidden");
        document.getElementById("next-evolution").classList.add("hidden");

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


        // Marte's evolution function

        let species = await getSpecies(pokemon);

        // show name and picture of previous evolution
        if (species.evolves_from_species != null) {

            let evolution = species.evolves_from_species.name;
            let evolutionPokemon = await getPokemon(evolution);

            target.querySelector(".prev-evolution").innerHTML = evolution;

            document.getElementById("img-prev-evolution").src = evolutionPokemon.sprites.front_default;
        }

        // show picture of next evolution
        let evolutionUrl = species.evolution_chain.url;
        let evolutionChain = await getEvolutionChain(evolutionUrl);

        console.log(evolutionChain);

        let evolution1 = evolutionChain.chain.evolves_to[0];
        console.log(evolution1.species);

        let evolution2 = evolution1.evolves_to[0];
        console.log(evolution2.species);

        if(pokemon.name === evolution1.species.name){
            document.getElementById("prev-evolution").classList.remove("hidden")
            let evolutionPokemon = await getPokemon(evolution1.species.name);
            document.getElementById("img-next-evolution").src = evolutionPokemon.sprites.front_default;
        }
        else if(pokemon.name === evolution1.species.name){
            document.getElementById("prev-evolution").classList.remove("hidden")
            let evolutionPokemon = await getPokemon(evolution2.species.name);
            document.getElementById("img-next-evolution").src = evolutionPokemon.sprites.front_default;
        }

        // show all evolutions
        document.getElementById("all-evolutions").querySelectorAll("img").forEach((img, i) => {

        })




        // way to hide empty pictures or evolution
        // -> CSS class (.hidden) in which we put display: hidden
        // when no previous or next evolution (or when we refresh/open window) we add this class to the parent element
        // when there is a evolution we remove this class

        // Julio's moves function


    })
})