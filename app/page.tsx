"use client";

import { useMemo, useState } from "react";

type CaseKey = "horizontal" | "parallel";
type Phase = "initial" | "solves" | "worsens";

const cases = {
  horizontal: {
    step: "01",
    tab: "Free provision: MPC′ = 0",
    title: "Free provision: how it solves and worsens market failure",
    intro: "Free provision moves consumption from Qp towards Qs, removing the original welfare loss X. But consumers continue beyond Qs until MPB = MPC′ = 0 at Q*, creating overconsumption and a new welfare loss Y.",
  },
  parallel: {
    step: "02",
    tab: "Adjust the MPC shift",
    title: "A larger MPC shift can solve—and then worsen—the failure",
    intro: "As MPC shifts rightwards to MPC′, consumption rises from Qp towards Qs and the original welfare loss falls. Once the shift pushes consumption beyond Qs, the policy overshoots and creates a new welfare loss.",
  },
} as const;

function Diagram({ mode, phase, meb, mpcShift }: { mode: CaseKey; phase: Phase; meb: number; mpcShift: number }) {
  const g = useMemo(() => {
    const top = 38, base = 400;
    const mpb = (q: number) => 100 - q;
    const msb = (q: number) => 100 + meb - q;
    const mpcSlope = mode === "horizontal" && phase === "solves" ? 0.75 : 1;
    const mpc = (q: number) => 10 + mpcSlope * q;
    const qp = 90 / (1 + mpcSlope);
    const qs = (90 + meb) / (1 + mpcSlope);
    const qstar = 100;
    const scaleX = mode === "parallel" ? 4.8 : 4.3;
    const midpoint = (qp + qs) / 2;
    const left = mode === "parallel" ? Math.max(60, 370 - midpoint * scaleX) : 100;
    const right = 675;
    const x = (q: number) => left + q * scaleX;
    const scaleY = Math.min(3.15, 340 / (55 + meb));
    const y = (v: number) => base - v * scaleY;
    return { left, right, top, base, x, y, mpb, msb, mpc, qp, qs, qstar };
  }, [meb, mode, phase]);
  const { left, right, top, base, x, y, mpb, msb, mpc, qp, qs, qstar } = g;
  const qAfter = phase === "initial" ? qp : mode === "parallel" ? (90 + mpcShift) / 2 : qstar;
  const mpcPrime = (q: number) => 10 + q - mpcShift;
  const mpcPrimeIntercept = Math.max(0, mpcShift - 10);
  const path = (fn: (q: number) => number, from = 0, to = mode === "parallel" ? 120 : 105) => `M ${x(from)} ${y(fn(from))} L ${x(to)} ${y(fn(to))}`;
  const under = `${x(qp)},${y(msb(qp))} ${x(qp)},${y(mpc(qp))} ${x(qs)},${y(mpc(qs))}`;
  const underMidX = (x(qp) + x(qp) + x(qs)) / 3;
  const underMidY = (y(msb(qp)) + y(mpc(qp)) + y(mpc(qs))) / 3;
  const over = `${x(qs)},${y(msb(qs))} ${x(qstar)},${y(msb(qstar))} ${x(qstar)},${y(mpc(qstar))}`;
  const overMidQ = (qs + qstar) / 2;
  const overMidY = (y(msb(overMidQ)) + y(mpc(overMidQ))) / 2;
  const policyDwl = `${x(qs)},${y(msb(qs))} ${x(qAfter)},${y(msb(qAfter))} ${x(qAfter)},${y(mpc(qAfter))}`;
  return (
    <svg className="diagram" viewBox="0 0 720 470" role="img" aria-label={`Economic diagram: ${cases[mode].title}`}>
      <defs>
        <pattern id="hatchX" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="8" stroke="#176b87" strokeWidth="3" /></pattern>
        <pattern id="hatchY" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="8" stroke="#d56638" strokeWidth="3" /></pattern>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#172b36" /></marker>
      </defs>
      <line className="axis" x1={left} y1={base} x2={left} y2={top} markerEnd="url(#arrow)" />
      <line className="axis" x1={left} y1={base} x2={right} y2={base} markerEnd="url(#arrow)" />
      <text className="axisLabel" x={left - 6} y={22}>Costs / Benefits</text><text className="axisLabel" x={right - 30} y={430}>Quantity</text><text x={left - 18} y={420}>0</text>
      <path className="curve msb" d={path(msb, 5, 115)} /><path className="curve mpb" d={path(mpb, 0, 100)} /><path className="curve mpc" d={path(mpc, 0, 120)} />
      <text className="label purple" x={x(83)} y={y(msb(83)) - 12}>MSB</text><text className="label blue" x={x(76)} y={y(mpb(76)) + 24}>MPB</text><text className="label green" x={x(72)} y={y(mpc(72)) - 13}>MPC = MSC</text>
      {(phase === "initial" || (mode === "horizontal" && phase === "solves")) && <><polygon points={under} fill="url(#hatchX)" opacity=".8" /><text className="areaLabel" x={underMidX} y={underMidY}>DWL X</text></>}
      {[qp, qs].map((q, i) => <g key={q}><line className="guide" x1={x(q)} y1={base} x2={x(q)} y2={i ? y(mpc(q)) : y(mpb(q))} />{!(i === 1 && mode === "horizontal" && phase === "solves") && <text className="qLabel" x={x(q)} y={424}>{i ? "Qs" : "Qp"}</text>}</g>)}
      {mode !== "parallel" && <><line className="mebLine" x1={x(qs) + 8} y1={y(mpb(qs))} x2={x(qs) + 8} y2={y(msb(qs))} /><text className="label orange" x={x(qs) + 18} y={(y(mpb(qs)) + y(msb(qs))) / 2}>MEB</text></>}
      {mode !== "parallel" && phase !== "initial" && <><line className="freeLine" x1={left} y1={base} x2={x(qstar)} y2={base} /><text className="freeLabel" x={left + 8} y={base - 10}>MPC′ = 0 (free)</text><line className="guide" x1={x(qstar)} y1={base} x2={x(qstar)} y2={y(mpb(qstar))} /><text className="qLabel star" x={x(qstar)} y={424}>{phase === "solves" ? "Qs = Q*" : "Q*"}</text></>}
      {mode === "parallel" && phase !== "initial" && <><path className="curve shifted" d={path(mpcPrime, mpcPrimeIntercept, 120)} /><text className="label shiftedText" x={x(Math.min(112, mpcPrimeIntercept + 12))} y={y(mpcPrime(Math.min(112, mpcPrimeIntercept + 12))) - 12}>MPC′</text><line className="guide" x1={x(qAfter)} y1={base} x2={x(qAfter)} y2={y(mpc(qAfter))} /><text className="qLabel star" x={x(qAfter)} y={424}>Qa</text>{phase === "worsens" && <><polygon points={policyDwl} fill="url(#hatchY)" opacity=".78" /><text className="areaLabel y" x={x((qs + qAfter) / 2)} y={y(mpc((qs + qAfter) / 2)) - 15}>DWL Y</text></>}</>}
      {mode !== "parallel" && phase === "worsens" && <><polygon points={over} fill="url(#hatchY)" opacity=".78" /><line className="dwlBoundary" x1={x(qstar)} y1={y(msb(qstar))} x2={x(qstar)} y2={y(mpc(qstar))} /><text className="areaLabel y" x={x(overMidQ)} y={overMidY}>DWL Y</text></>}
      {phase === "solves" && <><line className="guide solvedGuide" x1={x(qs)} y1={base} x2={x(qs)} y2={y(mpc(qs))} /><text className="solvedLabel" x={x(qs) + 12} y={y(mpc(qs)) - 18}>Allocative efficiency</text></>}
      <circle className="point" cx={x(qp)} cy={y(mpb(qp))} r="5" /><circle className="point" cx={x(qs)} cy={y(mpc(qs))} r="5" />
    </svg>
  );
}

export default function Home() {
  const [mode, setMode] = useState<CaseKey>("horizontal");
  const [phase, setPhase] = useState<Phase>("initial");
  const [meb, setMeb] = useState(40);
  const mpcShift = phase === "initial" ? 0 : phase === "solves" ? meb : Math.min(110, meb + 40);
  const displayMeb = mode === "horizontal" && phase === "solves" ? 85 : meb;
  const solvedMpcSlope = mode === "horizontal" && phase === "solves" ? 0.75 : 1;
  const qp = Math.round(90 / (1 + solvedMpcSlope));
  const qs = Math.round((90 + displayMeb) / (1 + solvedMpcSlope));
  const after = phase === "initial" ? qp : mode === "horizontal" ? 100 : phase === "solves" ? qs : Math.round((90 + mpcShift) / 2);
  const gap = after - qs;
  const verdict = phase === "initial" ? "MARKET FAILURE: UNDERCONSUMPTION" : phase === "solves" ? "MARKET FAILURE CORRECTED" : "POLICY WORSENS MARKET FAILURE";
  return <main>
    <header className="hero"><div><span className="eyebrow">H1 / H2 ECONOMICS · MARKET FAILURE</span><h1>When does free provision<br/><em>solve or worsen market failure?</em></h1></div><p>Compare two cases. In each one, see how free provision first corrects underconsumption, but can worsen the situation when consumption is pushed beyond the social optimum.</p></header>
    <nav className="tabs" aria-label="Diagram cases">{(Object.keys(cases) as CaseKey[]).map(k => <button key={k} className={mode === k ? "active" : ""} onClick={() => { setMode(k); setPhase("initial"); }}><b>{cases[k].step}</b><span>{cases[k].tab}</span></button>)}</nav>
    <nav className="phases" aria-label="Policy stages"><button className={phase === "initial" ? "active" : ""} onClick={() => setPhase("initial")}><b>1</b><span>Initial market failure</span></button><button className={phase === "solves" ? "active solves" : ""} onClick={() => setPhase("solves")}><b>2</b><span>Free provision solves</span></button><button className={phase === "worsens" ? "active worsens" : ""} onClick={() => setPhase("worsens")}><b>3</b><span>Free provision worsens</span></button></nav>
    <section className="workspace">
      <article className="graphCard"><div className="graphHead"><div><span className="caseNo">CASE {cases[mode].step} · STAGE {phase === "initial" ? "1" : phase === "solves" ? "2" : "3"}</span><h2>{phase === "initial" ? "Initial market failure" : phase === "solves" ? "Free provision solves the market failure" : "Free provision worsens the situation"}</h2></div><span className={`verdict ${phase === "solves" ? "works" : "risk"}`}>{verdict}</span></div><Diagram mode={mode} phase={phase} meb={displayMeb} mpcShift={mpcShift}/><div className="legend"><span><i className="l msbL"/>MSB</span><span><i className="l mpbL"/>MPB</span><span><i className="l mpcL"/>MPC = MSC</span>{phase !== "initial" && <span><i className="l freeL"/>MPC′ after free provision</span>}</div></article>
      <aside className="panel"><span className="caseNo">THE ECONOMIC STORY</span><h3>{phase === "initial" ? "The free market underconsumes because MPB is below MSB. The market equilibrium is Qp, while the socially optimal quantity is Qs. The underconsumption from Qp to Qs creates welfare loss X." : phase === "solves" ? mode === "horizontal" ? "Free provision lowers MPC′ to zero. Consumers maximise utility where MPB = MPC′ = 0 at Qs. Since this coincides with MSB = MSC, Qs is socially optimal and the original underconsumption is fully corrected." : "Free provision lowers the marginal private cost faced by consumers. Consumption rises from Qp to Qs, eliminating welfare loss X and achieving allocative efficiency." : cases[mode].intro}</h3>{mode === "horizontal" && phase === "solves" ? <div className="metric"><span>Successful free-provision condition</span><strong>Qs = Q*</strong><small>MPB = MPC′ = 0 and MSB = MSC at the same quantity.</small></div> : <div className="metric"><span>Marginal external benefit</span><strong>{displayMeb}</strong><input aria-label="Marginal external benefit" type="range" min="10" max="110" value={displayMeb} onChange={e => setMeb(+e.target.value)} /><small>Changing MEB moves the socially optimal quantity Qs.</small></div>}{mode === "parallel" && phase !== "initial" && <div className="metric shiftControl"><span>Rightward shift of MPC</span><strong>{mpcShift}</strong><small>{phase === "solves" ? `The shift equals MEB (${displayMeb}), so Qa = Qs.` : `The shift exceeds MEB, so Qa > Qs.`}</small></div>}<div className="quantities"><div><span>Free market</span><b>Qp = {qp}</b></div><div><span>Social optimum</span><b>Qs = {qs}</b></div><div><span>{phase === "initial" ? "Current outcome" : "After policy"}</span><b>{phase === "initial" ? "Qp" : mode === "horizontal" && phase === "solves" ? "Qs = Q*" : mode === "horizontal" ? "Q*" : phase === "solves" ? "Qs" : "Qa"} = {after}</b></div></div>
        <div className="logic"><h4>Chain of analysis</h4>{mode === "horizontal" && (phase === "solves" ? <ol><li>Initially, the free market consumes <b>Qp</b>, below the social optimum <b>Qs</b>.</li><li>Free provision lowers the price and <b>MPC′ to zero</b>.</li><li>Consumers maximise utility where <b>MPB = MPC′ = 0</b>.</li><li>This occurs at <b>Qs = Q*</b>, which also satisfies <b>MSB = MSC</b>.</li><li>Consumption rises from Qp to Qs, eliminating welfare loss <b>X</b>.</li></ol> : <ol><li>The free market consumes <b>Qp</b>, below the social optimum <b>Qs</b>, creating welfare loss <b>X</b>.</li><li>Free provision lowers <b>MPC′ to zero</b>, so consumers choose Q* where <b>MPB = MPC′</b>.</li><li>When <b>Q* &gt; Qs</b>, society overconsumes and a new welfare loss <b>Y</b> is created.</li></ol>)}{mode === "parallel" && <ol><li>The free market consumes <b>Qp</b>, below <b>Qs</b>, creating welfare loss <b>X</b>.</li><li><b>Solves:</b> shifting MPC rightwards raises consumption towards Qs and progressively removes X.</li><li>When the shift equals MEB ({displayMeb}), <b>Qa = Qs</b> and allocative efficiency is achieved.</li><li><b>Worsens:</b> a larger shift makes <b>Qa &gt; Qs</b>, causing overconsumption and a new welfare loss <b>Y</b>.</li></ol>}</div>
        <div className="exam"><span>EXAM-READY EVALUATION</span><p>Free provision improves welfare only up to Qs. If it reduces the private cost by more than the MEB, consumption exceeds Qs and the policy replaces the original welfare loss X with a new welfare loss Y. Accurate estimation and calibration are therefore essential.</p></div>
      </aside>
    </section>
    <footer><b>Core condition</b><span>Free provision is allocatively efficient only when the quantity chosen at zero private cost equals Qs, where MSB = MSC.</span></footer>
  </main>
}
