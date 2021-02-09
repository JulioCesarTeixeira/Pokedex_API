// fetch function


async function getPokemon(input) {
    let pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + input);
    return await pokemon.json();
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('pokemon-id').addEventListener('keyup', async () => {

        let target = document.getElementById("tpl-pokemon");
        let input = document.getElementById("pokemon-id").value;
        let pokemon = await getPokemon(input);
        let id = pokemon.id;
        let namePoke = pokemon.name;
        const getMoves = document.getElementById('get-moves');

        //get 4 random moves and display them
        document.getElementById("moves").classList.remove("hidden");
        let theMoves = pokemon.moves;
        let moves = theMoves.sort(() => 0.5 - Math.random());
        moves = moves.slice(0, 4);
        getMoves.innerText = "";
        for (let i = 0; i < moves.length; i++) {
            let moveNames = document.createElement('p');
            moveNames.innerText = moves[i].move.name;
            getMoves.append(moveNames);
        }

        //display name and id
        target.querySelector('.name').innerHTML = namePoke;
        target.querySelector(".ID-number").innerHTML = id + " - ";

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

        // function to
        async function displayEvolutions(pokemon) {

            document.getElementById("all-evolutions").classList.remove("hidden");
            document.getElementById("extra-evolutions").querySelectorAll("img").forEach(img => {img.remove()}) ;

            let species = await getSpecies(pokemon);
            let evolutionUrl = species.evolution_chain.url;
            let evolutionChain = await getEvolutionChain(evolutionUrl);

            document.getElementById("evolution-images").classList.remove("hidden");

            if (evolutionChain.chain.evolves_to.length === 0) {
                document.getElementById("all-evolutions").classList.add("hidden");
                return;
            }

            let evolution0 = evolutionChain.chain.species.name;
            let evolution1 = evolutionChain.chain.evolves_to[0].species.name;

            console.log(evolution0);
            console.log(evolution1);

            console.log(evolutionChain.chain.evolves_to.length);
            console.log(evolutionChain.chain.evolves_to[0].evolves_to.length);

            if (evolutionChain.chain.evolves_to.length === 1 && evolutionChain.chain.evolves_to[0].evolves_to.length === 0) {
                await displayEvolutionPicture(evolution0, "evolution0");
                await displayEvolutionPicture(evolution1, "evolution1");

                document.getElementById("evolution2").classList.add("hidden");
                document.getElementById("evolution3").classList.add("hidden");
            }
            else if (evolutionChain.chain.evolves_to[0].evolves_to.length === 1) {
                let evolution2 = evolutionChain.chain.evolves_to[0].evolves_to[0].species.name;

                document.getElementById("evolution2").classList.remove("hidden");
                document.getElementById("evolution3").classList.add("hidden");

                await displayEvolutionPicture(evolution0, "evolution0");
                await displayEvolutionPicture(evolution1, "evolution1");
                await displayEvolutionPicture(evolution2, "evolution2");
            }
            else if (evolutionChain.chain.evolves_to.length === 1 && evolutionChain.chain.evolves_to[0].evolves_to.length === 2) {
                let evolution2 = evolutionChain.chain.evolves_to[0].evolves_to[0].species.name;
                let evolution3 = evolutionChain.chain.evolves_to[0].evolves_to[1].species.name;

                document.getElementById("evolution2").classList.remove("hidden");

                await displayEvolutionPicture(evolution0, "evolution0");
                await displayEvolutionPicture(evolution1, "evolution1");
                await displayEvolutionPicture(evolution2, "evolution2");
                await displayEvolutionPicture(evolution3, "evolution3");
            }
            else if(evolutionChain.chain.evolves_to.length > 1){
                evolutionChain.chain.evolves_to.forEach((evolution, index) => {

                    let pokemonName = evolution.species.name;
                    let newImg = document.createElement("img");
                    newImg.id = "pokemon-evolution-" + index;

                    document.getElementById("evolution-images").classList.add("hidden");
                    document.getElementById("extra-evolutions").classList.remove("hidden");
                    document.getElementById("extra-evolutions").appendChild(newImg);

                    displayPicture(pokemonName, newImg.id);
                })


            }

            async function displayEvolutionPicture(namePoke, elementId) {
                let pokemonToDisplay = await getPokemon(namePoke);
                let imgElement = document.getElementById(elementId).querySelector("img");
                imgElement.id = namePoke;

                document.getElementById(elementId).classList.remove("hidden");
                imgElement.src = pokemonToDisplay.sprites.front_default;
            }
        }
    })

    // when you click on the image of an evolution, go to that pokemon
    document.getElementById("all-evolutions").querySelectorAll("img").forEach((img, index) => {
        img.addEventListener("click", () => {
            document.getElementById("pokemon-id").value = img.id;
            let event = document.createEvent('KeyboardEvent');
            event.initEvent('keyup', false, false);
            document.getElementById("pokemon-id").dispatchEvent(event);
        })
    })
})