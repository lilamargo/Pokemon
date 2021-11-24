import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions/index.js';
import { Link } from 'react-router-dom';
import  Card from './Card'


export default function Home (){

  const dispatch = useDispatch() //Para utilizar esa constante e ir despachando esas acciones.
  const allPokemons = useSelector((state) => state.pokemones)
  console.log(allPokemons)
  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch]);

  function handleClick(e){
e.preventDefault();
dispatch(getPokemons());
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
          <select>
            <option value= 'asc'> Ascendente </option>
            <option value= 'desc'> Descendente </option>
          </select>


      <label>Existentes y Creados</label>
          <select>
            <option> Existentes </option>
            <option> Creados </option>
          </select>


      <label>Orden por Tipos</label>
          <select>
            <option> Tipos </option>
          </select>


      <label>Orden por Puntos de Fuerza</label>
          <select>
          <option value= 'asc'> Ascendente </option>
          <option value= 'desc'> Descendente </option>
          </select>
          {
            allPokemons?.map(el => {
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
