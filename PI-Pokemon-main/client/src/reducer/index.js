const initialState = {
  pokemones: [],
  allPokemones: [],
  arrayTipos: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemones: action.payload,
        allPokemones: action.payload,
      };

    case "GET_NAME_POKEMONES":
      return {
        ...state,
        pokemones: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "GET_TIPOS":
      return {
        ...state,
        arrayTipos: action.payload,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allPokemones.filter((el) => el.createInDb)
          : state.allPokemones.filter((el) => !el.createInDb);
      return {
        ...state,
        pokemones: createdFilter,
      };

    case "FILTER_TIPOS":
      let allFilterTipos = state.allPokemones;
      let filtrar = allFilterTipos.filter((el) =>
        el.tipo.map((t) => t.name).includes(action.payload)
      );
      return {
        ...state,
        pokemones: filtrar,
      };

    case "ORDER_ALFABETICO":
      let sortedArr =
        action.payload === "asc"
          ? state.pokemones.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemones.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemones: sortedArr,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "ORDER_FUERZA":
      let orderFuerza =
        action.payload === "asc"
          ? state.pokemones.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemones.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemones: orderFuerza,
      };

    default:
      return state;
  }
}

export default rootReducer;
