import React from "react";
import { getNamePokemones } from "../actions/index.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import estilo from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleButtonSubmit(e) {
    e.preventDefault();
    dispatch(
      getNamePokemones(name)
    ); /*recibirá el name porque es un estado local*/
  }

  return (
    <div className={estilo.searchcont}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        onChange={(e) => handleInputChange(e)}
        className={estilo.input}
      />
      <button
        type="submit"
        onClick={(e) => handleButtonSubmit(e)}
        className={estilo.btn}
      >
        {" "}
        ►{" "}
      </button>
    </div>
  );
}
