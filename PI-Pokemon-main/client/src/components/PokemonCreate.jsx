import React from "react";
import { useState, useEffect } from "react";
import { postPokemon, getTipos } from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import estilos from "./PokemonCreate.module.css";
import logo from "../recursos/logo.png";
import Swal from "sweetalert2";

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
    description: "",
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
      Swal.fire({
        title: "Error!",
        text: "You can only add up to 2 types",
        icon: "error",
        confirmButtonText: "Return",
      });
    } else {
      dispatch(postPokemon(input));
      Swal.fire({
        icon: "success",
        title: "Congrats, You have a new Pokemon!",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff",
        backdrop: `
    rgba(0,0,123,0.4)
    left top
    no-repeat
  `,
      });
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
        description: "",
      });
    }
  }

  useEffect(() => {
    dispatch(getTipos());
  }, [dispatch]);

  return (
    <div className={estilos.body}>
      <header className={estilos.header}>
        <div className={estilos.logo}>
          <img src={logo} alt="Logo imagen pokemon" />
        </div>
        <nav className={estilos.navmenu}>
          <ul>
            <li>
              <a href="/home">HOME</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className={estilos.titulo}>
        <h1>CUSTOM A NEW POKEMON!</h1>
      </div>
      <div className={estilos.main}>
        <form onSubmit={(e) => handleSubmit(e)} className={estilos.form}>
          <div className={estilos.name}>
            <h3>NAME</h3>
            <input
              type="text"
              pattern="[a-zA-Z ]{2,254}"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              required
              title="Please, enter only text without numbers"
            />
          </div>
          <h3>STATS</h3>
          <div className={estilos.stats}>
            <label>HP:</label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
              required
              title="Please, enter only numbers"
              min="1"
              max="999"
            />

            <label>Attack:</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
              required
              title="Please, enter only numbers"
              min="1"
              max="999"
            />

            <label>Defense:</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
              required
              title="Please, enter only numbers"
              min="1"
              max="999"
            />

            <label>Speed:</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
              required
              title="Please, enter only numbers"
              min="1"
              max="999"
            />

            <label>Height:</label>
            <input
              type="number"
              step="any"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
              title="Please, enter only numbers"
              min="1"
              max="999"
            />

            <label>Weight:</label>
            <input
              type="number"
              step="any"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
              required
              title="Please, enter only numbers"
              min="1"
              max="999"
            />
          </div>
          <div className={estilos.description}>
            <h3>DESCRIPTION</h3>
            <textarea
              name="description"
              rows="10"
              cols="40"
              onChange={(e) => handleChange(e)}
            >
              Write a nice description...
            </textarea>
          </div>
          <h3>TYPES</h3>
          <div className={estilos.type}>
            <label>Type:</label>
            <select onChange={(e) => handleSelect(e)}>
              <option value="none" defaultValue title="">
                Select Type(s)
              </option>
              {estadoTipos?.map((t) => (
                <option value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
          {input.tipo?.map((t) => (
            <div className={estilos.cuadrito}>
              <p>{t}</p>
              <button onClick={(e) => handleDelete(e, t)}> X </button>
            </div>
          ))}
          <div className={estilos.btn}>
            <button type="submit">SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
}
