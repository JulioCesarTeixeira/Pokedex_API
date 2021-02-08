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

    console.log(input);
    console.log(img);

    document.getElementById("pokemon-id").src = img;

})();


// async function pokemonInfo()  {
//     const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + input)
//     return await pokemon.json();
// }
// console.log(pokemonInfo());
document.addEventListener("DOMContentLoaded", function(event){
document.querySelector('button').addEventListener('click', async () => {

    let input = document.getElementById("pokemon-id").value;
    let pokemon = await getPokemon(input);
    let id = pokemon.id;
    let name = pokemon.name;

    let img = await getPokemonImg(id);

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
})
});