const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonCards = document.getElementById('cards');
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

      pokemons.forEach((pokemon) => {
        const pokemonElement = document.createElement('li');
        pokemonElement.classList.add('pokemon', pokemon.type);
        pokemonElement.innerHTML =`
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                      ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>`;

      pokemonElement.addEventListener('mousemove', (event) => {
        showPokemonInfo(pokemon, event);
      });

      pokemonElement.addEventListener('mouseleave', hideInfo);

      pokemonList.appendChild(pokemonElement);

      // const listItems = []
      
      // for (let i = 0; i < pokemons.length; i++) {
      //   const pokemon = pokemons[i];
      //   listItems.push(convertPokemonToLi(pokemon))
      // }
  
      // console.log(listItems)
  
    }).join("");
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordWithNextPage = offset + limit;

  if(qtdRecordWithNextPage >= maxRecords){
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset, limit);
  }
  attachCardsToPokemons();

})


function showPokemonInfo(pokemon, event) {

  setTimeout(() => {
    const cardContent = document.createElement('div');
    cardContent.classList.add(`${pokemon.type}`, 'card-pokemon');
    cardContent.innerHTML = `
        <span class="card-name">${pokemon.name}</span>
        <span class="card-number">#${pokemon.number}</span>
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        <table class="information">
            <span>About</span>
            <tr>
                <td>Height</td>
                <td>${pokemon.height} dm</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${pokemon.weight} dm</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td>${pokemon.abilities.join(", ")}</td>
            </tr>

        </table>`;

    pokemonCards.innerHTML = '';
    pokemonCards.appendChild(cardContent);
  }, 200);

  if (event.clientX < (window.screen.width / 2) - 20) {
    pokemonCards.style.left = event.pageX + 10 + "px";
  } else {
    pokemonCards.style.left = event.pageX - 410 + "px";
  }
  pokemonCards.style.top = event.pageY + 10 + "px";
  pokemonCards.classList.add('show');
}

function hideInfo(){
  pokemonCards.classList.remove('show');
}