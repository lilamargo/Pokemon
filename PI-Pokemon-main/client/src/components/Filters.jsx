import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  orderAlfabetico,
  getTipos,
  filterTipos,
  orderFuerza,
} from "../actions/index.js";

import estilos from "./Filters.module.css";

export default function Filters({ setCurrentPage, setOrden }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTipos());
  }, [dispatch]);

  const filtroTipos = useSelector((state) => state.arrayTipos);

  function handleFilterTipo(e) {
    e.preventDefault();
    dispatch(filterTipos(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
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
    <div className={estilos.contener}>
      <div>
        <label>Category</label>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="api"> Original </option>
          <option value="created"> Custom </option>
        </select>
      </div>

      <div>
        <label>By Name</label>
        <select onChange={(e) => handleOrderAlfabetico(e)}>
          <option value="asc"> A-Z </option>
          <option value="desc"> Z-A </option>
        </select>
      </div>

      <div>
        <label>By Attack</label>
        <select onChange={(e) => handleOrderFuerza(e)}>
          <option value="asc"> Higher </option>
          <option value="desc"> Less </option>
        </select>
      </div>

      <div>
        <label>By Types</label>
        <select onChange={(e) => handleFilterTipo(e)}>
          <option selected disabled>
            Type
          </option>
          {filtroTipos?.map((t) => (
            <option value={t.name} key={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
