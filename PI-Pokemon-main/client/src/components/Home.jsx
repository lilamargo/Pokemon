import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderAlfabetico } from '../actions/index.js';
import { Link } from 'react-router-dom';
import  Card from './Card';
import Paginado from './Paginado';


export default function Home (){

const dispatch = useDispatch() //Para utilizar esa constante e ir despachando esas acciones.
const allPokemones = useSelector((state) => state.pokemones)

const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [pokemonesPerPage, setPokemonesPerPage] = useState(12)
const indexOfLastPokemon = currentPage * pokemonesPerPage
const indexOfFirstPokemon = indexOfLastPokemon - pokemonesPerPage
const currentPokemones = allPokemones.slice(indexOfFirstPokemon, indexOfLastPokemon)

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
}

  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch]);

  function handleClick(e){
e.preventDefault();
dispatch(getPokemons());
}

  function handleFilterCreated(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
  }

  function handleOrderAlfabetico(e){
    e.preventDefault();
    dispatch(orderAlfabetico(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div>
      <Link to='/pokemon'> Crear Personaje </Link>
       <h1> POKEMON </h1>
       <button onClick = {(e) => {handleClick(e)}}>
          Volver a cargar a todos los personajes
       </button>
       <div>

      <label>Orden Alfabético</label>
          <select onChange={e => handleOrderAlfabetico(e)}>
            <option value= 'asc'> Ascendente </option>
            <option value= 'desc'> Descendente </option>
          </select>

      <label>Orden por Puntos de Fuerza</label>
      <select>
      <option value= 'asc'> Ascendente </option>
      <option value= 'desc'> Descendente </option>
      </select>

      <label>Existentes y Creados</label>
          <select onChange={e => handleFilterCreated(e)}>
            <option value='All'> Todos </option>
            <option value='api'> Existentes </option>
            <option value='created'> Creados </option>
          </select>


      <label>Orden por Tipos</label>
          <select>
            <option> Tipos </option>
          </select>




          <Paginado
          pokemonesPerPage = {pokemonesPerPage}
          allPokemones = {allPokemones.length}
          paginado = {paginado}
          />


          {
            currentPokemones?.map(el => {
              return (
                <>
                <Link to={'/home/' + el.id}>
                  <Card name={el.name} image={el.image} tipo={el.tipo.map(n => n.name + ' ')} />
                </Link>
                </>
              )
            })
          }
       </div>
    </div>
  )
};
