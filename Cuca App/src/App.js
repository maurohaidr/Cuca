import React from "react";
import Inicio from './components/Inicio.js'
import { Route } from "react-router-dom";


function App() {
  return (
      <React.Fragment>
          <Route exact path="/" component={Inicio} />
      </React.Fragment>
  );
}

export default App;
