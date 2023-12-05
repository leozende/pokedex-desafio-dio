const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
  
      const newHtml = pokemons.map((pokemon) => {
          return`
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                      ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`
        }).join("")

      pokemonList.innerHTML += newHtml;
      // const listItems = []
      
      // for (let i = 0; i < pokemons.length; i++) {
      //   const pokemon = pokemons[i];
      //   listItems.push(convertPokemonToLi(pokemon))
      // }
  
      // console.log(listItems)
  
    })
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

})