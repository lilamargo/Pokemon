
const initialState = {
  pokemones : []
}

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_POKEMONS':
    return {
      ...state,
      pokemones: action.payload
    }
    default: return state;
  }
}

export default rootReducer;
