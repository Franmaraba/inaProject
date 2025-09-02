import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EnviarMensagem from "./componets/enviar";
import TelaDisplay from "./componets/display";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial com botões */}
        <Route
          path="/"
          element={
            <div className="home-container">
              <h1>INA bRAZIL</h1>
              <img className="img-logo" src="INA.png" alt="logo" />
              <h1>Painel de Mensagens</h1>
              <p>Escolha o modo:</p>

              <Link className="btn btn-enviar" to="/enviar">
                Enviar Mensagem
              </Link>

              <Link className="btn btn-exibicao" to="/display">
                Tela de Exibição
              </Link>
            </div>
          }
        />

        {/* Telas individuais */}
        <Route path="/enviar" element={<EnviarMensagem />} />
        <Route path="/display" element={<TelaDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
