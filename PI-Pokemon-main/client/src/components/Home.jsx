/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions/index.js";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import Filters from "./Filters";
import estilohome from "./Home.module.css";

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
      <Link to="/pokemon">
        <button className={estilohome.btn}>New Pokemon</button>
      </Link>
      <h1 className={estilohome.h}> Pokedex </h1>
      <h5>
        Gives background information on the habitat or activities of a Pokemon
        in the wild or other information on the pokemon's history or anatomy
      </h5>

      <SearchBar />

      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className={estilohome.btn}
      >
        Reload
      </button>

      <div>
        <Filters setCurrentPage={setCurrentPage} setOrden={setOrden} />
        <Paginado
          pokemonesPerPage={pokemonesPerPage}
          allPokemones={allPokemones.length}
          paginado={paginado}
        />
        <Cards currentPokemones={currentPokemones} />
      </div>
    </div>
  );
}
