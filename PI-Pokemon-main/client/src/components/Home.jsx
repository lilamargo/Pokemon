/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterCreated,
  orderAlfabetico,
  getTipos,
  filterTipos,
  orderFuerza,
} from "../actions/index.js";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Cards from "./Cards";

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
    dispatch(getTipos());
  }, [dispatch]);

  const filtroTipos = useSelector((state) => state.arrayTipos);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleFilterTipo(e) {
    e.preventDefault();
    dispatch(filterTipos(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderAlfabetico(e) {
    e.preventDefault();
    dispatch(orderAlfabetico(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderFuerza(e) {
    e.preventDefault();
    dispatch(orderFuerza(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/pokemon"> Crear Personaje </Link>
      <h1> POKEMON </h1>

      <SearchBar />

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar a todos los personajes
      </button>

      <div>
        <label>Orden Alfabético</label>
        <select onChange={(e) => handleOrderAlfabetico(e)}>
          <option value="asc"> A-Z </option>
          <option value="desc"> Z-A </option>
        </select>

        <label>Orden por Puntos de Fuerza</label>
        <select onChange={(e) => handleOrderFuerza(e)}>
          <option value="asc"> Ascendente </option>
          <option value="desc"> Descendente </option>
        </select>

        <label>Existentes y Creados</label>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="api"> Existentes </option>
          <option value="created"> Creados </option>
        </select>

        <label>Orden por Tipos</label>
        <select onChange={(e) => handleFilterTipo(e)}>
          {filtroTipos?.map((t) => (
            <option value={t.name} key={t.id}>
              {t.name}
            </option>
          ))}
        </select>

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
