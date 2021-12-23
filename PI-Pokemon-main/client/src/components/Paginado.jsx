import React from "react";
import stilos from "./Paginado.module.css";

export default function Paginado({ pokemonesPerPage, allPokemones, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemones / pokemonesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={stilos.list} key={number}>
              <button onClick={() => paginado(number)} key={number}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
