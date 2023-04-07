const pokedex$$ = document.querySelector("#pokedex");

const fetcher = async () => {
  let retorno = []
  let recoger 
  for(i = 1; i<152; i++){
    recoger = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    retorno.push(recoger)
  }
  return retorno
}

const get = async () => {
  const response  = await fetcher()
  let pokemons = [];
  for (respuestas in response){
    let res = await response[respuestas].json();
    pokemons.push(res)
  }
  return pokemons;
};


const pokemon = (results) => {  
  return results.map((result) => ({
  name: result.name,
  image: result.sprites['front_default'],
  type: result.types.map((type) => type.type.name).join(', '),
  id: result.id
  }))
}

const draw = (pokemons) => {  
  console.log(pokemons)
  pokedex$$.innerHTML = "";
  for (const pokemon of pokemons) {
    console.log(pokemon)
    const div$$ = document.createElement("div");
    div$$.innerHTML = ` 
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.image}" alt="${pokemon.type}">
    <p>${pokemon.id}</p>
    `;
    pokedex$$.appendChild(div$$);
  }
};

const searchCharacter = (arrayPokemons, filtro) => {
  let filteredPokemons = arrayPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
  );

  draw(filteredPokemons);
};

const takeInput = (pokemons) => {
  const h1$$ = document.querySelector("h1")
  let h2$$ = document.createElement("h2")
  let h2Text$$ = document.createTextNode("Buscador Pokemon")
  h2$$.appendChild(h2Text$$)
  divInicial$$ = document.querySelector(".container")
  divInicial$$.insertBefore(h2$$, divInicial$$.children[1])
  let creadorInput$$ = document.createElement("input")
  divInicial$$.insertBefore(creadorInput$$, divInicial$$.children[2])

    const input$$ = document.querySelector("input");
    input$$.addEventListener("input", () =>
      searchCharacter(pokemons, input$$.value)
  );
};

const init = async () => {   
    const characters = await get();
    const mapedPokemon = pokemon(characters)
    console.log(mapedPokemon)
    draw(mapedPokemon);
    takeInput(mapedPokemon);
  
  };
  init();