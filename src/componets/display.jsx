import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import '../CSS/telaDisplay.css';

function TelaDisplay() {
  const [texto, setTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [cabeca_hino, setCabeca_hino] = useState("");
  const [hinos, setHinos] = useState([]);

  useEffect(() => {
    // Listener para texto bíblico
    const unsubTexto = onSnapshot(doc(db, "SD", "textoBiblico"), (docSnap) => {
      if (docSnap.exists()) setTexto(docSnap.data().content);
    });

    // Listener para mensagem bíblica
    const unsubMensagem = onSnapshot(doc(db, "SD", "mensagemBiblica"), (docSnap) => {
      if (docSnap.exists()) setMensagem(docSnap.data().content);
    });

    // Listener para cabeçalho do hino
    const unsubCabeca = onSnapshot(doc(db, "SD", "cabeca-hino"), (docSnap) => {
      if (docSnap.exists()) setCabeca_hino(docSnap.data().content);
    });

    // Listener para hinos
    const unsubHino = onSnapshot(doc(db, "SD", "hino"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHinos([data.hino1, data.hino2, data.hino3, data.hino4].filter(Boolean)); 
      }
    });

    // Cleanup: remove listeners
    return () => {
      unsubTexto();
      unsubMensagem();
      unsubCabeca();
      unsubHino();
    };
  }, []);

  const temConteudo = texto || mensagem || cabeca_hino || hinos.length > 0;

  return (
    <div className="tela-container">
      {temConteudo ? (
        <>
          <div className="coluna-esquerda">
            {texto && <h1 className="texto">{texto}</h1>}
            {mensagem && <h1 className="mensagem">{mensagem}</h1>}
          </div>

          <div className="coluna-direita">
          <h1 className="cabeca-hino">HINOS</h1>
            {hinos.map((hino, index) => (
              <h2 key={index} className="hino">{hino}</h2>
            ))}
          </div>
        </>
      ) : (
        <div className="espera">
          <img src="/INA.png" alt="Aguardando mensagem..." />
        </div>
      )}
    </div>
  );
}

export default TelaDisplay;
