// the fetch functions to get our pokemon, species and evolutionchain

async function getPokemon(input) {
    let pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + input);
    return await pokemon.json();
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('run').addEventListener('click', async () => {

        let target = document.getElementById("tpl-pokemon");
        let input = document.getElementById("pokemon-id").value;
        let pokemon = await getPokemon(input);
        let id = pokemon.id;
        let namePoke = pokemon.name;
        const getMoves = document.getElementById('get-moves');

        //get 4 random moves and display them
        let theMoves = pokemon.moves;
        let moves = theMoves.sort(() => 0.5 - Math.random());
        moves = moves.slice(0, 4);
        getMoves.innerText = "";
        for (let i = 0; i < moves.length; i++) {
            let moveNames = document.createElement('p');
            moveNames.innerText = moves[i].move.name;
            //console.log(getMoves);
            getMoves.append(moveNames);
        }

        //display name and id
        target.querySelector('.name').innerHTML = namePoke;
        target.querySelector(".ID-number").innerHTML = id;

        // display picture of input pokemon
        await displayPicture(namePoke, "img-pokemon");

        async function displayPicture(namePoke, elementId) {
            let pokemonToDisplay = await getPokemon(namePoke);
            document.getElementById(elementId).classList.remove("hidden");
            document.getElementById(elementId).src = pokemonToDisplay.sprites.front_default;
        }

        // the evolution part of the code

        async function getSpecies(pokemon) {
            let species = await fetch(pokemon.species.url);
            return await species.json();
        }

        async function getEvolutionChain(url) {
            let evolutionChain = await fetch(url);
            return await evolutionChain.json();
        }

        await displayEvolutions(pokemon);

        async function displayEvolutions(pokemon) {

            let species = await getSpecies(pokemon);
            let evolutionUrl = species.evolution_chain.url;
            let evolutionChain = await getEvolutionChain(evolutionUrl);

            document.getElementById("evolution").classList.remove("hidden");

            if (evolutionChain.chain.evolves_to.length === 0) {
                document.getElementById("evolution").classList.add("hidden");
                return;
            }

            let basicPokemon = evolutionChain.chain.species.name;
            let evolution1 = evolutionChain.chain.evolves_to[0].species.name;

            console.log(evolutionChain.chain.evolves_to.length);
            console.log(evolutionChain.chain.evolves_to[0].evolves_to.length);

            if (evolutionChain.chain.evolves_to.length === 1 && evolutionChain.chain.evolves_to[0].evolves_to.length === 0) {
                await displayPicture(basicPokemon, "basicPokemon");
                await displayPicture(evolution1, "evolution1");
                document.getElementById("evolution2").classList.add("hidden");

            } else if (evolutionChain.chain.evolves_to[0].evolves_to.length === 1) {
                let evolution2 = evolutionChain.chain.evolves_to[0].evolves_to[0].species.name;
                document.getElementById("evolution2").classList.remove("hidden");
                await displayPicture(basicPokemon, "basicPokemon");
                await displayPicture(evolution1, "evolution1");
                await displayPicture(evolution2, "evolution2");
            }
        }
    })
})