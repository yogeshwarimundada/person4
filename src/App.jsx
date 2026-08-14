import React, { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "./App.css";

const agents = [
  { id: "env", icon: "🌱", name: "Environmental", short: "ENV", color: "#39d98a" },
  { id: "eco", icon: "💰", name: "Economist", short: "ECON", color: "#7c8cff" },
  { id: "law", icon: "⚖️", name: "Lawyer", short: "LAW", color: "#f6c85f" },
  { id: "eng", icon: "⚙️", name: "Engineer", short: "ENG", color: "#55c7ff" },
  { id: "inv", icon: "📈", name: "Investor", short: "INVEST", color: "#ff7ab6" },
  { id: "cit", icon: "👥", name: "Citizen", short: "CITIZEN", color: "#b58cff" },
];

const debate = [
  ["env", "Public transport can significantly reduce emissions and congestion."],
  ["eco", "The initial investment is high, but long-term economic returns are strong."],
  ["law", "The plan needs environmental approvals and transparent land acquisition."],
  ["eng", "A phased metro and electric-bus rollout is technically feasible."],
  ["inv", "I am concerned about capital risk. Can the project be phased?"],
  ["cit", "Citizens support better transport if affordability and accessibility are protected."],
  ["eco", "A phased investment reduces risk while preserving long-term benefits."],
  ["eng", "We can prioritize high-demand corridors first and measure outcomes."],
  ["law", "With clear safeguards, the legal risk becomes manageable."],
  ["inv", "I revise my position: phased investment is acceptable."],
  ["env", "I support the phased approach if emission targets are measurable."],
  ["cit", "Then the proposal balances affordability, access and sustainability."],
];

const scores = [
  { name: "ENV", initial: 90, final: 95 },
  { name: "ECON", initial: 60, final: 82 },
  { name: "LAW", initial: 55, final: 76 },
  { name: "ENG", initial: 70, final: 86 },
  { name: "INV", initial: 48, final: 72 },
  { name: "CIT", initial: 65, final: 88 },
];

function App() {
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(0);
  const [round, setRound] = useState(1);
  const [showReasoning, setShowReasoning] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (visible >= debate.length) {
      setTyping(false);
      setRound(3);
      return;
    }
    setTyping(true);
    const timer = setTimeout(() => {
      setVisible(v => v + 1);
      setTyping(false);
      if (visible >= 3) setRound(2);
      if (visible >= 8) setRound(3);
    }, 900);
    return () => clearTimeout(timer);
  }, [running, visible]);

  const chartData = useMemo(() => scores.map(x => ({ ...x })), []);

  const start = () => {
    setVisible(0);
    setRound(1);
    setShowReasoning(false);
    setRunning(true);
  };

  const progress = Math.min((visible / debate.length) * 100, 100);

  return (
    <div className="app">
      <div className="aurora aurora1" />
      <div className="aurora aurora2" />

      <header className="topbar">
        <div className="brand">
          <div className="brandMark">◉</div>
          <div>
            <div className="brandName">CONSENSUS<span>AI</span></div>
            <div className="brandSub">MULTI-AGENT NEGOTIATION SOCIETY</div>
          </div>
        </div>
        <div className="status"><span className="pulse" /> SYSTEM ONLINE</div>
        <div className="round">ROUND <b>{round}</b> / 3</div>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">NEGOTIATION CHAMBER · REAL-WORLD DECISION</div>
          <h1>Should Pune invest more in<br /><span>public transport?</span></h1>
          <p>Six independent perspectives debate the problem, challenge assumptions and converge on a transparent decision.</p>
          <button className="startBtn" onClick={start}>
            {running && visible < debate.length ? "NEGOTIATION IN PROGRESS  →" : "START NEGOTIATION  →"}
          </button>
          <div className="progress"><div style={{ width: `${progress}%` }} /></div>
        </section>

        <section className="agentRow">
          {agents.map((a, i) => {
            const active = running && visible < debate.length && debate[visible]?.[0] === a.id;
            return (
              <div className={`agent ${active ? "active" : ""}`} key={a.id} style={{ "--agent": a.color }}>
                <div className="agentIcon">{a.icon}</div>
                <div className="agentInfo">
                  <b>{a.name}</b><span>{a.short}</span>
                </div>
                <div className="agentScore">{scores[i].final}%</div>
                {active && <div className="thinking">THINKING...</div>}
              </div>
            );
          })}
        </section>

        <section className="grid">
          <div className="panel debatePanel">
            <div className="panelHead">
              <div><span className="liveDot" /> LIVE NEGOTIATION</div>
              <span className="mini">PROPOSE → CHALLENGE → REVISE → CONVERGE</span>
            </div>
            <div className="debateFeed">
              {!running && <div className="empty"><div className="bigIcon">◎</div><b>Negotiation chamber ready</b><span>Press “Start Negotiation” to activate the agents.</span></div>}
              {debate.slice(0, visible).map(([id, text], index) => {
                const a = agents.find(x => x.id === id);
                return (
                  <div className="message" key={index}>
                    <div className="msgIcon" style={{ background: `${a.color}18`, borderColor: `${a.color}55` }}>{a.icon}</div>
                    <div className="msgBody">
                      <div><b style={{ color: a.color }}>{a.name}</b><span>ROUND {index < 4 ? 1 : index < 9 ? 2 : 3}</span></div>
                      <p>{text}</p>
                    </div>
                  </div>
                );
              })}
              {typing && <div className="typing"><span /> <span /> <span /> Agent is formulating a response...</div>}
              {running && visible >= debate.length && <div className="converged">✦ ALL AGENTS HAVE CONVERGED</div>}
            </div>
          </div>

          <div className="panel chartPanel">
            <div className="panelHead">
              <div>STANCE SHIFT</div>
              <span className="mini">BEFORE → AFTER</span>
            </div>
            <div className="chartWrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" width={52} tick={{ fill: "#9da8c2", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid #26324b", borderRadius: 12 }} />
                  <Bar dataKey="initial" fill="#313b52" barSize={7} radius={[0, 5, 5, 0]} />
                  <Bar dataKey="final" fill="#8b7cff" barSize={7} radius={[0, 5, 5, 0]}>
                    {chartData.map((_, i) => <Cell key={i} fill={agents[i].color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="legend"><span><i className="before" /> Initial position</span><span><i className="after" /> Final position</span></div>
            <div className="shiftNote">↗ Investor changed <b>+24 points</b> after the phased-investment proposal.</div>
          </div>
        </section>

        <section className={`consensus ${running && visible >= debate.length ? "revealed" : ""}`}>
          <div className="consensusGlow" />
          <div className="consensusTop">
            <div className="check">✓</div>
            <div><div className="eyebrow">CONSENSUS REACHED</div><h2>Phased investment recommended</h2></div>
            <div className="score"><strong>84%</strong><span>AGREEMENT</span></div>
          </div>
          <p className="recommendation">Proceed with a phased public-transport expansion, prioritizing high-demand corridors while enforcing legal safeguards, affordability targets and measurable environmental outcomes.</p>
          <div className="tradeoffs">
            <span>🌱 Environment <b>+ BENEFIT</b></span>
            <span>💰 Economy <b>+ LONG TERM</b></span>
            <span>⚖️ Legal <b>+ SAFEGUARDS</b></span>
            <span>👥 Citizen <b>+ ACCESS</b></span>
          </div>
          <button className="reasonBtn" onClick={() => setShowReasoning(!showReasoning)}>
            {showReasoning ? "HIDE REASONING ↑" : "VIEW REASONING ↓"}
          </button>
          {showReasoning && (
            <div className="reasoning">
              <div><b>1.</b> High initial cost was identified as the main conflict.</div>
              <div><b>2.</b> Engineers proposed phased implementation to reduce risk.</div>
              <div><b>3.</b> Legal safeguards addressed compliance concerns.</div>
              <div><b>4.</b> Investors revised their stance after risk was reduced.</div>
              <div><b>5.</b> All six agents converged on a balanced recommendation.</div>
            </div>
          )}
        </section>
      </main>
      <footer>CONSENSUS AI · TRANSPARENT DECISIONS THROUGH COLLABORATIVE INTELLIGENCE</footer>
    </div>
  );
}

export default App;
