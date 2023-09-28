const listapokemon = document.querySelector("#listapokemon");
const botonesheader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Crear un array para almacenar los datos de los Pokémon
const pokemonDataArray = [];

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            // Almacenar los datos en el array
            pokemonDataArray.push(data);

            // Ordenar el array por ID
            pokemonDataArray.sort((a, b) => a.id - b.id);

            // Mostrar los Pokémon ordenados
            listapokemon.innerHTML = "";
            pokemonDataArray.forEach(pokemon => mostrarpokemon(pokemon));
        });
}

function mostrarpokemon(data) {
    let tipos = data.types.map(type => `<h3 class="${type.type.name}">${type.type.name}</h3>`);
    tipos = tipos.join('');

    let dataid = data.id.toString();
    if (dataid.length === 1) {
        dataid = "00" + dataid;
    } else if (dataid.length === 2) {
        dataid = "0" + dataid;
    }

    const div = document.createElement("div");
    div.classList.add("tarjeta");
    div.innerHTML = `
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
    <div class="numero_pokemon">
        <h2 class="numero_grande">#${dataid}</h2>
    </div>
    <div class="nombre_pokemon">
        <h3 class="numero_chico">#${dataid}</h3>
        <h1 class="nombre">${data.name}</h1>
    </div>
    <div class="clases">
        ${tipos}
    </div>
    <div class="medidas">
        <h3 class="tamaño">${data.height}M</h3>
        <h3 class="peso">${data.weight}KG</h3>
    </div>
    `;
    
    // Aplicar estilo a los elementos generados dinámicamente
    div.querySelectorAll('h3').forEach((element) => {
        element.style.display = "flex";
        element.style.justifyContent = "center";
        element.style.alignItems = "center";
        element.style.padding = "0.25rem 0.5rem";
        element.style.borderRadius = "100vmax";
        element.style.textAlign = "center";
        element.style.margin = "0.25rem";
        element.style.fontSize = "0.9rem";
    });

    listapokemon.append(div);
}

botonesheader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonid = event.currentTarget.id;

    listapokemon.innerHTML = "";

    if (botonid === "vertodos") {
        // Mostrar todos los Pokémon ordenados
        pokemonDataArray.forEach(pokemon => mostrarpokemon(pokemon));
    } else {
        // Filtrar y mostrar los Pokémon que coincidan con el tipo seleccionado
        const filteredPokemon = pokemonDataArray.filter(pokemon => {
            const tipos = pokemon.types.map(type => type.type.name);
            return tipos.some(tipo => tipo.includes(botonid));
        });
        filteredPokemon.forEach(pokemon => mostrarpokemon(pokemon));
    }
}));

