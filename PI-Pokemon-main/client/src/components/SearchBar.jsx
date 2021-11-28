import React from "react";
import { getNamePokemones } from "../actions/index.js";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
        placeholder="Buscar Pokemon..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleButtonSubmit(e)}>
        {" "}
        Buscar{" "}
      </button>
    </div>
  );
}
