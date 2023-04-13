const pokedex$$ = document.querySelector("#pokedex");

//Parte de la función que obtiener datos de la API, para poder coger todos los pokemons necesarios
const fetcher = async () => {
  let retorno = []
  let recoger 
  for(i = 1; i<152; i++){
    recoger = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    retorno.push(recoger)
  }
  return retorno
}

// Funcion para recoger los datos de la API
const getpokemon = async () => {
  const response  = await fetcher()
  let pokemons = [];
  for (respuestas in response){
    let res = await response[respuestas].json();
    pokemons.push(res)
  }
  return pokemons;
};

// Constante para almacenar los datos de los pokemons
const pokemon = (results) => {  
  return results.map((result) => ({
  name: result.name,
  image: result.sprites['front_default'],
  type: result.types.map((type) => type.type.name).join(', '),
  id: result.id
  }))
}

// Constante para dibujar los pokemon en el proyecto
const draw = (pokemons) => {  
  console.log(pokemons)
  pokedex$$.innerHTML = "";
  for (const pokemon of pokemons) {
    console.log(pokemon)
    const div$$ = document.createElement("div");
    div$$.innerHTML = `<span style='color:#FF9999'> 
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.image}" alt="${pokemon.type}">
    <p>${pokemon.type}</p>
    <p>${pokemon.id}</p>
    </span></span>
    `;
    pokedex$$.appendChild(div$$);
  }
};

//Parte de takeInput, filtra los datos obtenidos y llama a draw para dibujar solo los pokemon filtrados
const searchPokemon = (arrayPokemons, filtro) => {
  let filteredPokemons = arrayPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
  );

  draw(filteredPokemons);
};

// Constante para recoger datos escritos en la barra de busqueda de pokemon
const takeInput = (pokemons) => {
  let h2$$ = document.createElement("h2")
  let h2Text$$ = document.createTextNode("Buscador Pokemon")
  h2$$.appendChild(h2Text$$)
  divInicial$$ = document.querySelector(".container")
  divInicial$$.insertBefore(h2$$, divInicial$$.children[1])
  let creadorInput$$ = document.createElement("input")
  divInicial$$.insertBefore(creadorInput$$, divInicial$$.children[2])

    const input$$ = document.querySelector("input");
    input$$.addEventListener("input", () =>
      searchPokemon(pokemons, input$$.value)
  );
};

//Inicio de la aplicación, llamada a otras funciones
const init = async () => {   
    const characters = await getpokemon();
    const mapedPokemon = pokemon(characters)
    // console.log(mapedPokemon)
    draw(mapedPokemon);
    takeInput(mapedPokemon);
  
  };
  init();