// import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions/index.js";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import Filters from "./Filters";
import estilohome from "./Home.module.css";
import toggepi from "../recursos/toggepi.gif";
import loading from "../recursos/loading.gif";
import logo from "../recursos/logo.png";

export default function Home() {
  const dispatch = useDispatch(); //Para utilizar esa constante e ir despachando esas acciones.
  const allPokemones = useSelector((state) => state.pokemones);

  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonesPerPage, setPokemonesPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonesPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonesPerPage;
  const currentPokemones = allPokemones.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div>
      <header className={estilohome.header}>
        <div className={estilohome.logo}>
          <img src={logo} alt="Logo imagen pokemon" />
        </div>
        <SearchBar />
        <nav className={estilohome.navmenu}>
          <ul>
            <li>
              <a href="/pokemon">New Pokemon!</a>
            </li>
          </ul>
        </nav>
      </header>

      <h1 className={estilohome.h}> Pokédex </h1>
      <div className={estilohome.hello}>
        <p>
          Hello there trainers! Welcome to the Liliana´s Pokédex where you will find
          background information about the habitat or activities of a Pokémon in
          the wild or other information about the history or anatomy of the
          Pokémon.
        </p>
      </div>

      <Filters setCurrentPage={setCurrentPage} setOrden={setOrden} />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className={estilohome.btn}
      >
        RELOAD
      </button>
      <Paginado
        pokemonesPerPage={pokemonesPerPage}
        allPokemones={allPokemones.length}
        paginado={paginado}
      />

      {currentPokemones.length > 0 ? (
        <Cards currentPokemones={currentPokemones} />
      ) : (
        <div className={estilohome.caja}>
          <img src={loading} alt="loading gif" className={estilohome.loader} />

          <img src={toggepi} alt="loading gif" className={estilohome.togge} />
        </div>
      )}
      <div className="estilohome.love"> <p> With ♥ by Liliana Martínez </p></div>
    </div>
  );
}
