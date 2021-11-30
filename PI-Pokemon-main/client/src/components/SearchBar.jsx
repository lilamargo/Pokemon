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
    <div>
      <input
        type="text"
        placeholder="search for pokemon with name"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleButtonSubmit(e)}
        className={estilo.btn}
      >
        {" "}
        SEARCH{" "}
      </button>
    </div>
  );
}
