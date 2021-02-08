// fetch function

let ditto = fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then(response => {
        return response.json()
    })
    .then(pokemon => {console.log(pokemon)});

console.log(ditto);






















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