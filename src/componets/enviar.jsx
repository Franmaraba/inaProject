import { useState } from "react";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import "../CSS/enviarMensagem.css"; // import do CSS

function EnviarMensagem() {
  const [t_biblical, setT_biblical] = useState("");
  const [t_message, setT_message] = useState("");
  const [hymn_1, setHymn_1] = useState("");
  const [hymn_2, setHymn_2] = useState("");
  const [hymn_3, setHymn_3] = useState("");
  const [hymn_4, setHymn_4] = useState("");

  async function handleEnviar() {
    if (t_biblical.trim() !== "") {
      await setDoc(doc(db, "SD", "textoBiblico"), { content: t_biblical });
      setT_biblical("");
    }

    if (t_message.trim() !== "") {
      await setDoc(doc(db, "SD", "mensagemBiblica"), { content: t_message });
      setT_message("");
    }

    if (hymn_1 || hymn_2 || hymn_3 || hymn_4) {
      await setDoc(doc(db, "SD", "hino"), {
        hino1: hymn_1,
        hino2: hymn_2,
        hino3: hymn_3,
        hino4: hymn_4,
      });
      setHymn_1("");
      setHymn_2("");
      setHymn_3("");
      setHymn_4("");
    }
  }

  async function handleLimparTela() {
    await setDoc(doc(db, "SD", "textoBiblico"), { content: "" });
    await setDoc(doc(db, "SD", "mensagemBiblica"), { content: "" });
    await setDoc(doc(db, "SD", "hino"), {
      hino1: "",
      hino2: "",
      hino3: "",
      hino4: "",
    });

    setT_biblical("");
    setT_message("");
    setHymn_1("");
    setHymn_2("");
    setHymn_3("");
    setHymn_4("");
  }



  return (
    <div className="container">
      <div className="container-filha">
        <h1>INA BRASIL</h1>
        <img className="img-logo" src="/INA.png" alt="" />
        <h2>Enviar mensagem</h2>

        <input
          type="text"
          value={t_biblical}
          onChange={(e) => setT_biblical(e.target.value)}
          placeholder="Digite o texto bíblico"
          className="input"
        />

        <textarea
          value={t_message}
          onChange={(e) => setT_message(e.target.value)}
          placeholder="Digite a leitura bíblica"
          className="input"
        />

        <input
          type="text"
          value={hymn_1}
          onChange={(e) => setHymn_1(e.target.value)}
          placeholder="Digite o Hino 1"
          className="input"
        />

        <input
          type="text"
          value={hymn_2}
          onChange={(e) => setHymn_2(e.target.value)}
          placeholder="Digite o Hino 2"
          className="input"
        />

        <input
          type="text"
          value={hymn_3}
          onChange={(e) => setHymn_3(e.target.value)}
          placeholder="Digite o Hino 3"
          className="input"
        />

        <input
          type="text"
          value={hymn_4}
          onChange={(e) => setHymn_4(e.target.value)}
          placeholder="Digite o Hino 4"
          className="input"
        />

        <br />

        <button onClick={handleEnviar} className="button">
          Enviar
        </button>
        <br />

        <button className="btn-limpar" onClick={handleLimparTela}>
              Limpar Tela
        </button>
      </div>
      
    </div>
  );
}

export default EnviarMensagem;
