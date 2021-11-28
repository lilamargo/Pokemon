import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/pokemon");
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getNamePokemones(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/api/pokemon?name=${name}`
      );
      return dispatch({
        type: "GET_NAME_POKEMONES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderAlfabetico(payload) {
  return {
    type: "ORDER_ALFABETICO",
    payload,
  };
}

export function getTipos() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/tipo", {});
    return dispatch({ type: "GET_TIPOS", payload: json.data });
  };
}

export function filterTipos(payload) {
  return {
    type: "FILTER_TIPOS",
    payload,
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const respuesta = await axios.post(
      "http://localhost:3001/api/pokemon",
      payload
    );
    return respuesta;
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/api/pokemon/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderFuerza(payload) {
  return {
    type: "ORDER_FUERZA",
    payload,
  };
}
