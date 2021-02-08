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