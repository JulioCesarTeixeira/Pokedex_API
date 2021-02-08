// fetch function

let ditto = fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then(response => {
        return response.json()
    })
    .then(pokemon => {console.log(pokemon)});

console.log(ditto);


















//Julio territory - input