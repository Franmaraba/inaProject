import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import '../CSS/telaDisplay.css';

function TelaDisplay() {
  const [texto, setTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [cabeca_hino, setCabeca_hino] = useState("");
  const [hino, setHino] = useState([]);

  useEffect(() => {
    // Cria listeners para todos os documentos
    const unsubTexto = onSnapshot(doc(db, "SD", "textoBiblico"), (docSnap) => {
      if (docSnap.exists()) setTexto(docSnap.data().content);
    });

    const unsubMensagem = onSnapshot(doc(db, "SD", "menssagemBiblica"), (docSnap) => {
      if (docSnap.exists()) setMensagem(docSnap.data().content);
    });

    const unsubCabeca = onSnapshot(doc(db, "SD", "cabeca-hino"), (docSnap) => {
      if (docSnap.exists()) setCabeca_hino(docSnap.data().content);
    });

    const unsubHino = onSnapshot(doc(db, "SD", "hino"), (docSnap) => {
      if (docSnap.exists()) setHino(docSnap.data().h1);
      console.log(unsubHino);
    });
  
    // Cleanup: cancela todos os listeners ao desmontar o componente
    return () => {
      unsubTexto();
      unsubMensagem();
      unsubCabeca();
      unsubHino();
    };
    
  }, []);

  const temConteudo = texto || mensagem || cabeca_hino || hino;

  return (
    <div className="tela-container">
      {temConteudo ? (
        <>
        <div className="coluna-direita">
          {texto && <h1 className="texto">{texto}</h1>}
          {mensagem && <h1 className="mensagem">{mensagem}</h1>}
        </div>
        <div className="coluna-esquerda">
            {cabeca_hino && <h1 className="cabeca-hino">{cabeca_hino}</h1>}
            {hino && <h1 className="hino">{hino}</h1>}
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
