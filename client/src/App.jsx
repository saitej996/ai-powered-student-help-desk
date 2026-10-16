import { useState, useEffect } from "react";
import { CreateMLCEngine } from "@mlc-ai/web-llm";

function App() {
  const [engine, setEngine] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Starting...");

  useEffect(() => {
    const initAI = async () => {
      try {
        const eng = await CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC", {
          initProgressCallback: (p) => setStatus(p.text)
        });
        setEngine(eng);
        setLoading(false);
      } catch(e){ setStatus("Error: " + e.message) }
    };
    initAI();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() ||!engine) return;
    const userMsg = { role: "user", content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");

    try {
      const reply = await engine.chat.completions.create({
        messages: [{role:"system", content:"You are a friendly student helpdesk assistant like Meta AI. Answer in Telugu/English mix."},...newMsgs]
      });
      setMessages([...newMsgs, { role: "assistant", content: reply.choices[0].message.content }]);
    } catch(err){
      setMessages([...newMsgs, { role: "assistant", content: "Error: " + err.message }]);
    }
  };

  if (loading) return <div style={{padding:50,textAlign:'center'}}><h2>🤖 {status}</h2><p>First time 2GB download avutundi bro, 5 mins wait. Second time nundi instant offline!</p></div>;

  return (
    <div style={{maxWidth:700,margin:'auto',padding:20, fontFamily:'sans-serif'}}>
      <h2>🎓 Student Helpdesk - Like Meta AI (100% Offline)</h2>
      <div>
        {messages.map((m,i) => (
          <div key={i} style={{background: m.role==='user'? '#dcf8c6' : '#e3f2fd', padding:10, margin:10, borderRadius:10, textAlign: m.role==='user'?'right':'left'}}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>
      <div style={{display:'flex', gap:10, marginTop:20}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && sendMessage()} placeholder="Emaina adugu bro, naa laage answer ista!" style={{flex:1,padding:12, borderRadius:8, border:'2px solid orange'}} />
        <button onClick={sendMessage} style={{padding:'12px 20px'}}>Send</button>
      </div>
    </div>
  );
}
export default App;