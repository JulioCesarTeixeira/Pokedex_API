// fetch function

async function getPokemon(input) {
    let pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + input);
    return await pokemon.json();
}

async function getPokemonImg(id) {
    let img = await fetch("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png");
    let imgBlob = await img.blob()
    return URL.createObjectURL(imgBlob);
}

(async () => {

    let input = "18";
    let pokemon = await getPokemon(input);

    let id = pokemon.id;
    let name = pokemon.name;

    let img = await getPokemonImg(id);

    console.log(id, name);
    console.log(img);

    document.getElementById("pokemon-id").src = img;

})();






















//Julio territory - input

async function pokemonInfo()  {
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + input)
    return await pokemon.json();
}
console.log(pokemonInfo());

document.getElementById('run').addEventListener('click', () =>{
    

    pokemonInfo().then(resolve =>{ //async function to display pokemons() ?
        let pokemon = resolve.pokemons.find(pokemon => pokemon.id === input);
        let pokemonResult = template.cloneNode(true);
            pokemonResult.querySelector('.name').innerHTML = pokemon.name;
            // pokemonResult.querySelector('.img-pokemon').innerHTML = '<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />';
            // pokemonResult.querySelector('.moves').innerText = pokemon.abilities.name;

            target.append(pokemonResult);
    }, reject => console.error(reject('did not work')));
})