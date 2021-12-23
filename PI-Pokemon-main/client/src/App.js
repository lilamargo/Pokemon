import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokemonCreate from "./components/PokemonCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/pokemon" component={PokemonCreate} />
          {/* <Route path="/home/:id" component={Detail} /> IMPORTAR EN CASO DE USAR*/}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
