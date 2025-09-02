import { useState } from "react";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Router } from "react-router-dom";

function EnviarMensagem() {
  const [t_biblical, setT_biblical] = useState("");
  const [t_message,setT_message] = useState("");
  const [h_hymn, setH_hymn] = useState("");
  const [t_hymn, setT_hymn] = useState("");

  async function handleEnviar() {
    if (t_biblical.trim() === "") return;
    await setDoc(doc(db, "SD", "textoBiblico"), {
      content: t_biblical,
    });
    setT_biblical("");

    if (t_message.trim() === "") return;
    await setDoc(doc(db, "SD", "menssagemBiblica"), {
      content: t_message,
    });
    setT_message("");

    if (h_hymn.trim() === "") return;
    await setDoc(doc(db, "SD", "cabeca-hino"), {
      content: h_hymn,
    });
    setH_hymn("");

    if (t_hymn.trim() === "") return;
    await setDoc(doc(db, "SD", "hino"), {
      h1: t_hymn,
    });
    setT_hymn("");
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Enviar mensagem</h2>
      <input
        type="text"
        value={t_biblical}
        onChange={(e) => setT_biblical(e.target.value)}
        placeholder="Digite o texto"
        style={{
          padding: "10em",
          width: "50%",
          borderRadius: "5px",
          marginBottom: "2rem",
        }}
      />

        <input
        type="text"
        value={t_message}
        onChange={(e) => setT_message(e.target.value)}
        placeholder="Digite sua mensagem"
        style={{
          padding: "10em",
          width: "50%",
          borderRadius: "5px",
          marginBottom: "2rem",
        }}
      />

        <input
        type="text"
        value={h_hymn}
        onChange={(e) => setH_hymn(e.target.value)}
        placeholder="Digite sua mensagem"
        style={{
          padding: "10em",
          width: "50%",
          borderRadius: "5px",
          marginBottom: "2rem",
        }}
      />

    <textarea
        type="text"
        value={t_hymn}
        onChange={(e) => setT_hymn(e.target.value)}
        placeholder="Digite sua mensagem"
        style={{
          padding: "10em",
          width: "50%",
          borderRadius: "5px",
          marginBottom: "2rem",
        }}
      />
      <br />
      <button
        onClick={handleEnviar}
        style={{
          padding: "0.8rem 2rem",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Enviar
      </button>
    </div>
  );
  return(
    <Router>
    <Routes>

    </Routes>
  </Router>
  );
}

export default EnviarMensagem;
