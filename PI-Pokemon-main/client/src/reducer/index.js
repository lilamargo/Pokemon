
const initialState = {
  pokemones : [],
  allPokemones: []
}

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_POKEMONS':
    return {
      ...state,
      pokemones: action.payload,
      allPokemones: action.payload
    }
    case 'FILTER_CREATED':
    const createdFilter = action.payload === 'created' ? state.allPokemones.filter(el => el.createInDb)
    : state.allPokemones.filter(el => !el.createInDb)
    return {
      ...state,
      pokemones: createdFilter
    }
    case 'ORDER_ALFABETICO':
    let sortedArr = action.payload === 'asc' ?
    state.pokemones.sort( function (a, b) {
      if(a.name > b.name){
        return 1;
      }
      if(b.name > a.name){
        return -1;
      }
      return 0;
    }) :
    state.pokemones.sort(function (a, b) {
      if(a.name > b.name){
        return -1;
      }
      if(b.name > a.name){
        return 1;
      }
      return 0;
    })
    return {
      ...state,
      pokemones: sortedArr
    }

    default: return state;
  }
}



export default rootReducer;
