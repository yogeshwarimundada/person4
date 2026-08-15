import React, { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "./App.css";

const agents = [
  { id: "env", icon: "🌱", name: "Environmental", short: "ENV", color: "#42e8a4", role: "Sustainability" },
  { id: "eco", icon: "💰", name: "Economist", short: "ECON", color: "#8d83ff", role: "Economic impact" },
  { id: "law", icon: "⚖️", name: "Lawyer", short: "LAW", color: "#ffd166", role: "Legal safeguards" },
  { id: "eng", icon: "⚙️", name: "Engineer", short: "ENG", color: "#58c9ff", role: "Feasibility" },
  { id: "inv", icon: "📈", name: "Investor", short: "INVEST", color: "#ff79b8", role: "Capital risk" },
  { id: "cit", icon: "👥", name: "Citizen", short: "CITIZEN", color: "#b991ff", role: "Public access" },
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

const particles = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 61) % 100}%`,
  delay: `${(i % 9) * 0.45}s`,
  duration: `${5 + (i % 6)}s`,
}));

function App() {
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(0);
  const [round, setRound] = useState(1);
  const [showReasoning, setShowReasoning] = useState(false);
  const [activeTab, setActiveTab] = useState("chamber");
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    if (!running || visible >= debate.length) return;
    const timer = setTimeout(() => {
      setVisible(v => v + 1);
      if (visible >= 3) setRound(2);
      if (visible >= 8) setRound(3);
    }, 760);
    return () => clearTimeout(timer);
  }, [running, visible]);

  const chartData = useMemo(() => scores.map(x => ({ ...x })), []);
  const complete = running && visible >= debate.length;
  const progress = Math.min((visible / debate.length) * 100, 100);
  const activeId = running && !complete ? debate[visible]?.[0] : null;

  const start = () => {
    setVisible(0);
    setRound(1);
    setShowReasoning(false);
    setSelectedAgent(null);
    setRunning(true);
    setActiveTab("chamber");
  };

  return (
    <div className="app">
      <div className="noise" />
      <div className="gridGlow" />
      <div className="aurora auroraA" />
      <div className="aurora auroraB" />
      <div className="particleLayer">
        {particles.map((p, i) => <i key={i} style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }} />)}
      </div>

      <header className="topbar">
        <div className="brand">
          <div className="brandMark"><span>✦</span></div>
          <div>
            <div className="brandName">CONSENSUS<span>AI</span></div>
            <div className="brandSub">MULTI-AGENT DECISION LAB</div>
          </div>
        </div>

        <div className="topMeta">
          <div className="status"><span className="pulse" /> LIVE SYSTEM</div>
          <div className="roundPill">ROUND <b>{round}</b><span>/ 3</span></div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="heroOrb orb1" />
          <div className="heroOrb orb2" />
          <div className="heroRing ringA" />
          <div className="heroRing ringB" />
          <div className="heroRing ringC" />
          <div className="energyCore"><span>✦</span><i /></div>
          <div className="orbitDots"><b /><b /><b /><b /></div>
          <div className="eyebrow"><span className="eyebrowLine" /> NEGOTIATION CHAMBER <span>·</span> REAL-WORLD DECISION <span className="eyebrowLine" /></div>
          <div className="liveBadge"><span /> SIX PERSPECTIVES · ONE DECISION</div>
          <h1>Should Pune invest more in <span>public transport?</span></h1>
          <p>Six independent agents challenge assumptions, exchange evidence and continuously revise their positions until a transparent consensus emerges.</p>

          <div className="heroActions">
            <button className="startBtn" onClick={start}>
              <span className="btnShine" />
              <span className="btnIcon">{complete ? "↻" : "▶"}</span>
              {complete ? "RUN NEW NEGOTIATION" : running ? "NEGOTIATION IN PROGRESS" : "START NEGOTIATION"}
              <b>→</b>
            </button>
            <div className="trust"><span>◈</span> Transparent reasoning <i /> No single-agent control</div>
          </div>

          <div className="waveform">
            {Array.from({length: 34}, (_, i) => <i key={i} style={{"--d": `${(i % 7) * .09}s`, "--h": `${8 + ((i * 17) % 30)}px`}} />)}
          </div>
          <div className="progressShell">
            <div className="progressLabels"><span>NEGOTIATION PROGRESS</span><b>{Math.round(progress)}%</b></div>
            <div className="progress"><div style={{ width: `${progress}%` }} /></div>
          </div>
        </section>

        <div className="connectionMap" aria-hidden="true">
            {agents.map((a, i) => <span key={a.id} style={{"--x": `${10 + i * 16}%`, "--delay": `${i * .3}s`}} />)}
          </div>
          <section className="agentRow">
          {agents.map((a, i) => {
            const active = activeId === a.id;
            const chosen = selectedAgent === a.id;
            return (
              <button
                className={`agent ${active ? "active" : ""} ${chosen ? "chosen" : ""}`}
                key={a.id}
                style={{ "--agent": a.color }}
                onClick={() => setSelectedAgent(chosen ? null : a.id)}
              >
                <div className="agentTop">
                  <div className="agentIcon">{a.icon}</div>
                  <div className="agentScore">{scores[i].final}%</div>
                </div>
                <div className="agentInfo"><b>{a.name}</b><span>{a.role}</span></div>
                <div className="agentMeter"><i style={{ width: `${scores[i].final}%` }} /></div>
                {active && <div className="thinking"><span /> THINKING</div>}
              </button>
            );
          })}
        </section>

        {selectedAgent && (
          <div className="agentDetail" style={{ "--agent": agents.find(a => a.id === selectedAgent).color }}>
            <span>{agents.find(a => a.id === selectedAgent).icon}</span>
            <b>{agents.find(a => a.id === selectedAgent).name}</b>
            <em>{agents.find(a => a.id === selectedAgent).role}</em>
            <small>Current stance: <strong>{scores[agents.findIndex(a => a.id === selectedAgent)].final}% aligned</strong></small>
          </div>
        )}

        <div className="viewTabs">
          <button className={activeTab === "chamber" ? "active" : ""} onClick={() => setActiveTab("chamber")}>◉ LIVE CHAMBER</button>
          <button className={activeTab === "analytics" ? "active" : ""} onClick={() => setActiveTab("analytics")}>⌁ STANCE ANALYTICS</button>
        </div>

        {activeTab === "chamber" ? (
          <section className="grid">
            <div className="panel debatePanel">
              <div className="panelHead">
                <div><span className="liveDot" /> LIVE NEGOTIATION <span className="messageCount">{visible}/{debate.length}</span></div>
                <span className="mini">PROPOSE <i>→</i> CHALLENGE <i>→</i> REVISE <i>→</i> CONVERGE</span>
              </div>
              <div className="debateFeed">
              <div className="feedScan" />
                {!running && (
                  <div className="empty">
                    <div className="emptyCore"><span>✦</span></div>
                    <b>Negotiation chamber ready</b>
                    <span>Activate the six agents to begin the debate.</span>
                  </div>
                )}
                {debate.slice(0, visible).map(([id, text], index) => {
                  const a = agents.find(x => x.id === id);
                  return (
                    <div className="message" key={index} style={{ "--agent": a.color }}>
                      <div className="msgIcon">{a.icon}</div>
                      <div className="msgBody">
                        <div><b>{a.name}</b><span>ROUND {index < 4 ? 1 : index < 9 ? 2 : 3}</span><time>{index + 1}</time></div>
                        <p>{text}</p>
                      </div>
                    </div>
                  );
                })}
                {running && !complete && (
                  <div className="typing"><div className="typingAvatar">{agents.find(a => a.id === activeId)?.icon}</div><span /><span /><span /><label>{agents.find(a => a.id === activeId)?.name} is formulating a response...</label></div>
                )}
                {complete && <div className="converged"><span>✦</span> ALL AGENTS HAVE CONVERGED <b>100%</b></div>}
              </div>
            </div>

            <div className="panel chartPanel">
              <div className="panelHead">
                <div>STANCE SHIFT</div>
                <span className="mini">BEFORE <i>→</i> AFTER</span>
              </div>
              <div className="chartWrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 8, top: 8, bottom: 4 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="name" width={52} tick={{ fill: "#8e9ab4", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#ffffff05" }} contentStyle={{ background: "#0d1422", border: "1px solid #293651", borderRadius: 12, color: "#fff", fontSize: 11 }} />
                    <Bar dataKey="initial" fill="#29344b" barSize={6} radius={[0, 5, 5, 0]} />
                    <Bar dataKey="final" barSize={8} radius={[0, 6, 6, 0]} animationDuration={1200}>
                      {chartData.map((_, i) => <Cell key={i} fill={agents[i].color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="legend"><span><i className="before" /> Initial position</span><span><i className="after" /> Final position</span></div>
              <div className="shiftNote"><span>↗</span><div>Biggest movement<br /><b>Investor +24 points</b></div><em>after phased investment</em></div>
            </div>
          </section>
        ) : (
          <section className="analyticsGrid">
            <div className="panel radarFake">
              <div className="panelHead"><div>DECISION SIGNALS</div><span className="mini">LIVE MODEL VIEW</span></div>
              <div className="signalList">
                {[["Environmental impact",95,"#42e8a4"],["Economic viability",82,"#8d83ff"],["Legal readiness",76,"#ffd166"],["Technical feasibility",86,"#58c9ff"],["Capital confidence",72,"#ff79b8"],["Citizen acceptance",88,"#b991ff"]].map(([n,v,c]) =>
                  <div className="signal" key={n}><div><span>{n}</span><b>{v}%</b></div><div className="signalTrack"><i style={{width:`${v}%`,background:c}} /></div></div>
                )}
              </div>
            </div>
            <div className="panel statsPanel">
              <div className="panelHead"><div>NEGOTIATION METRICS</div><span className="mini">SESSION #024</span></div>
              <div className="metricGrid">
                <div><strong>6</strong><span>AGENTS</span></div>
                <div><strong>3</strong><span>ROUNDS</span></div>
                <div><strong>12</strong><span>ARGUMENTS</span></div>
                <div><strong>84%</strong><span>AGREEMENT</span></div>
              </div>
              <div className="miniTimeline">
                <span className="done">PROPOSE</span><i /><span className="done">CHALLENGE</span><i /><span className="done">REVISE</span><i /><span className="final">CONVERGE</span>
              </div>
            </div>
          </section>
        )}

        <section className={`consensus ${complete ? "revealed" : ""}`}>
          <div className="consensusGlow" />
          <div className="consensusRings"><i /><i /><i /></div>
          <div className="scanLine" />
          <div className="consensusTop">
            <div className="check"><span>✓</span><i className="checkPulse" /></div>
            <div><div className="eyebrow left">CONSENSUS REACHED</div><h2>Phased investment <span>recommended</span></h2></div>
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
              <div><b>01</b> High initial cost was identified as the main conflict.</div>
              <div><b>02</b> Engineers proposed phased implementation to reduce risk.</div>
              <div><b>03</b> Legal safeguards addressed compliance concerns.</div>
              <div><b>04</b> Investors revised their stance after risk was reduced.</div>
              <div><b>05</b> All six agents converged on a balanced recommendation.</div>
            </div>
          )}
        </section>
      </main>

      <footer><span>✦</span> CONSENSUS AI <i /> TRANSPARENT DECISIONS THROUGH COLLABORATIVE INTELLIGENCE <span>·</span> v2.0</footer>
    </div>
  );
}

export default App;
