"use client";

import { useMemo, useState } from "react";

type CaseKey = "horizontal" | "parallel" | "over";

const cases = {
  horizontal: {
    step: "01",
    tab: "Free provision: MPC′ = 0",
    title: "Free provision may create overconsumption",
    intro: "The government makes the good free at the point of consumption. MPC falls to MPC′ = 0, so consumers continue until MPB also reaches zero at Q*. The welfare loss is now measured from Qs to Q*.",
  },
  parallel: {
    step: "02",
    tab: "Adjust the MPC shift",
    title: "Shift MPC rightwards with the subsidy",
    intro: "Use the rightward-shift slider. MPC′ remains parallel to MPC, while its horizontal intercept and its intersection with MPB move right. At the maximum shift, MPC′ meets MPB on the horizontal axis at Q*.",
  },
  over: {
    step: "03",
    tab: "MEB too small: overconsumption",
    title: "Free provision may overshoot the social optimum",
    intro: "When MEB is small, Qs lies before the point where MPB reaches zero. Making consumption free pushes quantity to Q*, creating overconsumption and a new welfare loss.",
  },
} as const;

function Diagram({ mode, meb, mpcShift }: { mode: CaseKey; meb: number; mpcShift: number }) {
  const g = useMemo(() => {
    const top = 38, base = 400;
    const mpb = (q: number) => 100 - q;
    const msb = (q: number) => 100 + meb - q;
    const mpc = (q: number) => 10 + q;
    const qp = 45;
    const qs = (90 + meb) / 2;
    const qstar = 100;
    const scaleX = mode === "parallel" ? 4.8 : mode === "horizontal" ? 4.3 : 5.35;
    const midpoint = (qp + qs) / 2;
    const left = mode === "parallel" ? Math.max(60, 370 - midpoint * scaleX) : mode === "horizontal" ? 100 : 76;
    const right = mode === "parallel" || mode === "horizontal" ? 675 : 650;
    const x = (q: number) => left + q * scaleX;
    const scaleY = Math.min(3.15, 340 / (55 + meb));
    const y = (v: number) => base - v * scaleY;
    return { left, right, top, base, x, y, mpb, msb, mpc, qp, qs, qstar };
  }, [meb, mode]);
  const { left, right, top, base, x, y, mpb, msb, mpc, qp, qs, qstar } = g;
  const qAfter = mode === "parallel" ? (90 + mpcShift) / 2 : qstar;
  const mpcPrime = (q: number) => 10 + q - mpcShift;
  const mpcPrimeIntercept = Math.max(0, mpcShift - 10);
  const path = (fn: (q: number) => number, from = 0, to = mode === "parallel" ? 120 : 105) => `M ${x(from)} ${y(fn(from))} L ${x(to)} ${y(fn(to))}`;
  const under = `${x(qp)},${y(msb(qp))} ${x(qp)},${y(mpc(qp))} ${x(qs)},${y(mpc(qs))}`;
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
      <path className="curve msb" d={path(msb, 5, mode === "parallel" || mode === "horizontal" ? 115 : 105)} /><path className="curve mpb" d={path(mpb, 0, 100)} /><path className="curve mpc" d={path(mpc, 0, mode === "parallel" || mode === "horizontal" ? 120 : 96)} />
      <text className="label purple" x={x(83)} y={y(msb(83)) - 12}>MSB</text><text className="label blue" x={x(76)} y={y(mpb(76)) + 24}>MPB</text><text className="label green" x={x(72)} y={y(mpc(72)) - 13}>MPC = MSC</text>
      <polygon points={under} fill="url(#hatchX)" opacity=".8" /><text className="areaLabel" x={x((qp + qs) / 2)} y={y(mpc(qs)) - 30}>X</text>
      {[qp, qs].map((q, i) => <g key={q}><line className="guide" x1={x(q)} y1={base} x2={x(q)} y2={i ? y(mpc(q)) : y(mpb(q))} /><text className="qLabel" x={x(q)} y={424}>{i ? "Qs" : "Qp"}</text></g>)}
      {mode !== "parallel" && <><line className="mebLine" x1={x(qs) + 8} y1={y(mpb(qs))} x2={x(qs) + 8} y2={y(msb(qs))} /><text className="label orange" x={x(qs) + 18} y={(y(mpb(qs)) + y(msb(qs))) / 2}>MEB</text></>}
      {mode !== "parallel" && <><line className="freeLine" x1={left} y1={base} x2={x(qstar)} y2={base} /><text className="freeLabel" x={left + 8} y={base - 10}>MPC′ = 0 (free)</text></>}
      {mode === "parallel" && <><polygon points={policyDwl} fill="url(#hatchY)" opacity=".78" /><path className="curve shifted" d={path(mpcPrime, mpcPrimeIntercept, 120)} /><text className="label shiftedText" x={x(Math.min(112, mpcPrimeIntercept + 12))} y={y(mpcPrime(Math.min(112, mpcPrimeIntercept + 12))) - 12}>MPC′</text><line className="guide" x1={x(qAfter)} y1={base} x2={x(qAfter)} y2={y(mpc(qAfter))} /><text className="qLabel star" x={x(qAfter)} y={424}>{mpcShift === 110 ? "Q*" : "Qa"}</text><text className="areaLabel y" x={x((qs + qAfter) / 2)} y={y(mpc((qs + qAfter) / 2)) - 15}>Y</text></>}
      {mode !== "parallel" && <><polygon points={over} fill="url(#hatchY)" opacity=".78" /><line className="dwlBoundary" x1={x(qstar)} y1={y(msb(qstar))} x2={x(qstar)} y2={y(mpc(qstar))} />{Math.abs(qs - qstar) > 1 && <text className="areaLabel y" x={x(overMidQ)} y={overMidY}>DWL Y</text>}<line className="guide" x1={x(qstar)} y1={base} x2={x(qstar)} y2={y(msb(qstar))} /><text className="qLabel star" x={x(qstar)} y={424}>{Math.abs(qs - qstar) <= 1 ? "Qs" : "Q*"}</text></>}
      <circle className="point" cx={x(qp)} cy={y(mpb(qp))} r="5" /><circle className="point" cx={x(qs)} cy={y(mpc(qs))} r="5" />
    </svg>
  );
}

export default function Home() {
  const [mode, setMode] = useState<CaseKey>("horizontal");
  const [meb, setMeb] = useState(40);
  const [mpcShift, setMpcShift] = useState(40);
  const smallMeb = Math.min(meb, 24);
  const displayMeb = mode === "over" ? smallMeb : meb;
  const qs = Math.round((90 + displayMeb) / 2);
  const after = mode === "parallel" ? Math.round((90 + mpcShift) / 2) : 100;
  const gap = after - qs;
  const verdict = Math.abs(gap) <= 1 ? "SOCIAL OPTIMUM REACHED" : gap < 0 ? "POLICY UNDERSHOOTS" : "POLICY OVERSHOOTS";
  return <main>
    <header className="hero"><div><span className="eyebrow">H1 / H2 ECONOMICS · MARKET FAILURE</span><h1>When should the government<br/><em>provide it for free?</em></h1></div><p>Explore how free provision changes the marginal private cost faced by consumers—and why the same policy can correct underconsumption or create overconsumption.</p></header>
    <nav className="tabs" aria-label="Diagram cases">{(Object.keys(cases) as CaseKey[]).map(k => <button key={k} className={mode === k ? "active" : ""} onClick={() => setMode(k)}><b>{cases[k].step}</b><span>{cases[k].tab}</span></button>)}</nav>
    <section className="workspace">
      <article className="graphCard"><div className="graphHead"><div><span className="caseNo">CASE {cases[mode].step}</span><h2>{cases[mode].title}</h2></div><span className={`verdict ${Math.abs(gap) <= 1 ? "works" : "risk"}`}>{verdict}</span></div><Diagram mode={mode} meb={displayMeb} mpcShift={mpcShift}/><div className="legend"><span><i className="l msbL"/>MSB</span><span><i className="l mpbL"/>MPB</span><span><i className="l mpcL"/>MPC = MSC</span><span><i className="l freeL"/>MPC′ after free provision</span></div></article>
      <aside className="panel"><span className="caseNo">THE ECONOMIC STORY</span><h3>{cases[mode].intro}</h3><div className="metric"><span>Marginal external benefit</span><strong>{displayMeb}</strong><input aria-label="Marginal external benefit" type="range" min="10" max={mode === "over" ? 24 : 110} value={displayMeb} onChange={e => setMeb(+e.target.value)} />{mode === "horizontal" && <><small>Set MEB to 110 so Qs coincides with the MPB intercept, reproducing the reference diagram.</small><button className="preset" onClick={() => setMeb(110)}>Match reference: MEB = 110</button></>}</div>{mode === "parallel" && <div className="metric shiftControl"><span>Rightward shift of MPC</span><strong>{mpcShift}</strong><input aria-label="Rightward shift of MPC" type="range" min="0" max="110" value={mpcShift} onChange={e => setMpcShift(+e.target.value)} /><small>Move to 110 for MPC′ to meet MPB on the horizontal axis.</small></div>}<div className="quantities"><div><span>Free market</span><b>Qp = 45</b></div><div><span>Social optimum</span><b>Qs = {qs}</b></div><div><span>After policy</span><b>{mode === "horizontal" && Math.abs(gap) <= 1 ? "Qs" : after === 100 ? "Q*" : "Qa"} = {after}</b></div></div>
        <div className="logic"><h4>Chain of analysis</h4>{mode === "horizontal" && <ol><li>Positive externality means <b>MSB &gt; MPB</b>.</li><li>The market underconsumes at <b>Qp</b>.</li><li>Free provision lowers consumers’ <b>MPC′ to zero</b>.</li><li>Consumers continue until <b>MPB = MPC′ = 0 at Q*</b>.</li><li>Since Q* &gt; Qs, the new DWL is area <b>Y</b>.</li></ol>}{mode === "parallel" && <ol><li>The subsidy shifts <b>MPC rightwards in parallel</b>.</li><li>The new private outcome is where <b>MPB = MPC′</b>.</li><li>At a shift of {displayMeb}, the outcome equals <b>Qs</b>.</li><li>At the maximum shift, MPC′ meets MPB on the axis at <b>Q*</b>.</li><li>The shaded policy DWL moves as the slider changes.</li></ol>}{mode === "over" && <ol><li>A smaller MEB places <b>Qs below Q*</b>.</li><li>At a zero price, consumers continue until <b>MPB = 0</b>.</li><li>Consumption rises beyond Qs to <b>Q*</b>.</li><li>Welfare loss <b>Y</b> may exceed original loss <b>X</b>.</li></ol>}</div>
        <div className="exam"><span>EXAM-READY EVALUATION</span><p>{mode === "over" ? "Free provision is not automatically the best policy. If the full subsidy exceeds MEB at Qs, it causes overconsumption, a larger deadweight loss and a high opportunity cost to the government." : "Free provision is effective only when the reduction in MPC is calibrated so that consumption rises exactly to Qs. The government must estimate MEB accurately and consider fiscal opportunity cost."}</p></div>
      </aside>
    </section>
    <footer><b>Core condition</b><span>Free provision is allocatively efficient only when the quantity chosen at zero private cost equals Qs, where MSB = MSC.</span></footer>
  </main>
}
