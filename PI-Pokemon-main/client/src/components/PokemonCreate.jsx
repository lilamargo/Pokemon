import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postPokemon, getTipos } from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";

export default function PokemonCreate() {
  const dispatch = useDispatch();

  let estadoTipos = useSelector((state) => state.arrayTipos);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image:
      "https://forums.pokemmo.eu/uploads/monthly_2020_10/1392966187789.gif.8f8685345a400e0e5d6ca3c2a1aba734.gif",
    tipo: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      tipo: [...input.tipo, e.target.value],
    });
  }

  function handleDelete(e, t) {
    e.preventDefault();
    setInput({
      ...input,
      tipo: input.tipo.filter((el) => el !== t),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (input.tipo.length > 2) {
      alert("Please, select maxim 2 types");
    } else {
      dispatch(postPokemon(input));
      alert("Pokemon Creado!!");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        tipo: [],
      });
    }
  }

  useEffect(() => {
    dispatch(getTipos());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        {" "}
        <button>RETURN HOME</button>{" "}
      </Link>

      <h1>CUSTOM A NEW POKEMON!</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            pattern="[a-zA-Z ]{2,254}"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="enter a original name"
            required
            title="Please, enter only text without numbers"
          />
        </div>
        <div>
          <label>HP:</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
            placeholder="enter hit points"
            required
          />
        </div>
        <div>
          <label>Attack:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
            placeholder="enter attack points"
            required
          />
        </div>
        <div>
          <label>Defense:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
            placeholder="enter defense points"
            required
          />
        </div>
        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
            placeholder="enter speed points"
            required
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            step="any"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
            placeholder="enter height"
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            step="any"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
            placeholder="enter weight"
            required
          />
        </div>
        <label>Type:</label>
        <select onChange={(e) => handleSelect(e)}>
          <option value="none" defaultValue title="">
            Select Type(s)
          </option>
          {estadoTipos?.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))}
        </select>
        {input.tipo?.map((t) => (
          <div>
            <p>{t}</p>
            <button onClick={(e) => handleDelete(e, t)}> X </button>
          </div>
        ))}

        <button type="submit">SAVE</button>
      </form>
    </div>
  );
}
