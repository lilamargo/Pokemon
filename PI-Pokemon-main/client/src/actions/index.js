import axios from 'axios';


export function getPokemons(){
  return async function(dispatch){
    var json = await axios.get('http://localhost:3001/api/pokemon');
    return dispatch({
      type: 'GET_POKEMONS',
      payload: json.data
    })
  }
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}

export function orderAlfabetico(payload){
  return {
    type: 'ORDER_ALFABETICO',
    payload
  }
}
