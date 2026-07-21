"use client";

import { useMemo, useState } from "react";

type CaseKey = "horizontal" | "parallel";
type Phase = "initial" | "solves" | "worsens";

const cases = {
  horizontal: {
    step: "01",
    tab: "Free provision: MPC′ = 0",
    title: "Free provision: how it solves and worsens market failure",
    intro:
      "Free provision moves consumption from Qp towards Qs, removing the original welfare loss X. But consumers continue beyond Qs until MPB = MPC′ = 0 at Q*, creating overconsumption and a new welfare loss Y.",
  },
  parallel: {
    step: "02",
    tab: "Adjust the MPC shift",
    title: "A larger MPC shift can solve—and then worsen—the failure",
    intro:
      "As MPC shifts rightwards to MPC′, consumption rises from Qp towards Qs and the original welfare loss falls. Once the shift pushes consumption beyond Qs, the policy overshoots and creates a new welfare loss.",
  },
} as const;

function Case2Diagram({ phase }: { phase: Phase }) {
  const initial = phase === "initial";
  const solves = phase === "solves";
  if (phase === "worsens")
    return (
      <svg
        className="diagram"
        viewBox="0 0 720 470"
        role="img"
        aria-label="Case 2: free provision creates a larger deadweight loss"
      >
        <defs>
          <pattern
            id="case2Stage3X"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="#176b87"
              strokeWidth="3"
            />
          </pattern>
          <pattern
            id="case2Stage3Y"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="#d56638"
              strokeWidth="3"
            />
          </pattern>
          <marker
            id="case2Stage3Arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#172b36" />
          </marker>
        </defs>
        <line
          className="axis"
          x1="100"
          y1="400"
          x2="100"
          y2="40"
          markerEnd="url(#case2Stage3Arrow)"
        />
        <line
          className="axis"
          x1="100"
          y1="400"
          x2="670"
          y2="400"
          markerEnd="url(#case2Stage3Arrow)"
        />
        <text className="axisLabel" x="94" y="24">
          Costs / Benefits
        </text>
        <text className="axisLabel" x="625" y="432">
          Quantity
        </text>
        <text x="82" y="422">
          0
        </text>
        <path className="curve mpb" d="M 160 196 L 500 400" />
        <path className="curve msb" d="M 160 86 L 560 326" />
        <path className="curve mpc" d="M 210 336 L 540 131" />
        <text className="label blue" x="455" y="382">
          MPB
        </text>
        <text className="label purple" x="525" y="316">
          MSB
        </text>
        <text className="label green" x="505" y="126">
          MPC = MSC
        </text>
        <polygon
          points="300,280 300,170 390,224"
          fill="url(#case2Stage3X)"
          opacity=".8"
        />
        <text className="areaLabel" x="326" y="212">
          X
        </text>
        <polygon
          points="390,224 500,156 500,290"
          fill="url(#case2Stage3Y)"
          opacity=".82"
        />
        <text className="areaLabel y" x="463" y="230">
          Y
        </text>
        <line className="freeLine" x1="100" y1="400" x2="500" y2="400" />
        <text className="freeLabel" x="112" y="387">
          MPC′ = P = 0
        </text>
        <line className="guide" x1="300" y1="400" x2="300" y2="170" />
        <text className="qLabel" x="300" y="424">
          Qp
        </text>
        <line className="guide" x1="390" y1="400" x2="390" y2="224" />
        <text className="qLabel" x="390" y="424">
          Qs
        </text>
        <line className="guide" x1="500" y1="400" x2="500" y2="156" />
        <text className="qLabel star" x="500" y="424">
          Q*
        </text>
        <circle className="point" cx="300" cy="280" r="5" />
        <circle className="point" cx="390" cy="224" r="5" />
        <circle className="point" cx="500" cy="400" r="5" />
      </svg>
    );
  return (
    <svg
      className="diagram"
      viewBox="0 0 720 470"
      role="img"
      aria-label={`Case 2: ${initial ? "initial market failure" : solves ? "MPC shift corrects market failure" : "MPC shifts too far right"}`}
    >
      <defs>
        <pattern
          id="case2X"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#176b87" strokeWidth="3" />
        </pattern>
        <pattern
          id="case2Y"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#d56638" strokeWidth="3" />
        </pattern>
        <marker
          id="case2Arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L7,3 z" fill="#172b36" />
        </marker>
      </defs>
      <line
        className="axis"
        x1="100"
        y1="400"
        x2="100"
        y2="40"
        markerEnd="url(#case2Arrow)"
      />
      <line
        className="axis"
        x1="100"
        y1="400"
        x2="670"
        y2="400"
        markerEnd="url(#case2Arrow)"
      />
      <text className="axisLabel" x="94" y="24">
        Costs / Benefits
      </text>
      <text className="axisLabel" x="625" y="432">
        Quantity
      </text>
      <text x="82" y="422">
        0
      </text>
      <path className="curve mpb" d="M 180 180 L 430 400" />
      <path className="curve msb" d="M 300 50 L 560 318" />
      <path className="curve mpc" d="M 210 350 L 500 130" />
      <text className="label blue" x="400" y="365">
        MPB
      </text>
      <text className="label purple" x="525" y="300">
        MSB
      </text>
      <text className="label green" x="445" y="165">
        MPC = MSC
      </text>
      {initial && (
        <>
          <polygon
            points="300,284 300,50 430,184"
            fill="url(#case2X)"
            opacity=".8"
          />
          <text className="areaLabel" x="345" y="170">
            DWL X
          </text>
        </>
      )}
      <line className="guide" x1="300" y1="400" x2="300" y2="284" />
      <text className="qLabel" x="300" y="424">
        Qp
      </text>
      <line className="guide" x1="430" y1="400" x2="430" y2="184" />
      <text className="qLabel" x="430" y="424">
        Qs
      </text>
      {!initial && (
        <>
          <line
            className="shiftArrow"
            x1="340"
            y1="245"
            x2={solves ? "500" : "575"}
            y2="245"
            markerEnd="url(#case2Arrow)"
          />
          <text className="shiftText" x={solves ? "365" : "400"} y="230">
            MPC shifts rightwards
          </text>
        </>
      )}
      {solves && (
        <>
          <path className="curve shifted" d="M 430 400 L 590 250" />
          <text className="label shiftedText" x="560" y="255">
            MPC′
          </text>
          <circle className="point" cx="430" cy="400" r="5" />
          <text className="qLabel star" x="430" y="447">
            Qs = Qa
          </text>
          <text className="solvedLabel" x="445" y="195">
            MSB = MSC
          </text>
          <text className="solvedLabel" x="445" y="390">
            MPB = MPC′
          </text>
        </>
      )}
      <circle className="point" cx="300" cy="284" r="5" />
      <circle className="point" cx="430" cy="184" r="5" />
    </svg>
  );
}

function Diagram({
  mode,
  phase,
  meb,
  mpcShift,
}: {
  mode: CaseKey;
  phase: Phase;
  meb: number;
  mpcShift: number;
}) {
  const g = useMemo(() => {
    const expanded = mode === "parallel" && phase === "worsens";
    const top = 38,
      base = expanded ? 300 : 400;
    const mpb = (q: number) => 100 - q;
    const msb = (q: number) => 100 + meb - q;
    const mpcSlope = 0.75;
    const mpc = (q: number) => 10 + mpcSlope * q;
    const qp = 90 / (1 + mpcSlope);
    const qs = (90 + meb) / (1 + mpcSlope);
    const qstar = 100;
    const scaleX = expanded ? 3.45 : mode === "parallel" ? 4.8 : 4.3;
    const midpoint = (qp + qs) / 2;
    const left = expanded
      ? 80
      : mode === "parallel"
        ? Math.max(60, 370 - midpoint * scaleX)
        : 100;
    const right = 675;
    const x = (q: number) => left + q * scaleX;
    const scaleY = expanded ? 1.8 : Math.min(3.15, 340 / (55 + meb));
    const y = (v: number) => base - v * scaleY;
    return { left, right, top, base, x, y, mpb, msb, mpc, qp, qs, qstar };
  }, [meb, mode, phase]);
  const { left, right, top, base, x, y, mpb, msb, mpc, qp, qs, qstar } = g;
  const mpcSlope = 0.75;
  const qAfter =
    phase === "initial"
      ? qp
      : mode === "parallel"
        ? (90 + mpcShift) / (1 + mpcSlope)
        : qstar;
  const mpcPrime = (q: number) => 10 + mpcSlope * q - mpcShift;
  const mpcPrimeIntercept = Math.max(0, (mpcShift - 10) / mpcSlope);
  const expanded = mode === "parallel" && phase === "worsens";
  const path = (
    fn: (q: number) => number,
    from = 0,
    to = expanded ? 170 : mode === "parallel" ? 120 : 105,
  ) => `M ${x(from)} ${y(fn(from))} L ${x(to)} ${y(fn(to))}`;
  const under = `${x(qp)},${y(msb(qp))} ${x(qp)},${y(mpc(qp))} ${x(qs)},${y(mpc(qs))}`;
  const underMidX = (x(qp) + x(qp) + x(qs)) / 3;
  const underMidY = (y(msb(qp)) + y(mpc(qp)) + y(mpc(qs))) / 3;
  const over = `${x(qs)},${y(msb(qs))} ${x(qstar)},${y(msb(qstar))} ${x(qstar)},${y(mpc(qstar))}`;
  const overMidQ = (qs + qstar) / 2;
  const overMidY = (y(msb(overMidQ)) + y(mpc(overMidQ))) / 2;
  const policyDwl = `${x(qs)},${y(msb(qs))} ${x(qAfter)},${y(msb(qAfter))} ${x(qAfter)},${y(mpc(qAfter))}`;
  if (mode === "parallel") return <Case2Diagram phase={phase} />;
  return (
    <svg
      className="diagram"
      viewBox="0 0 720 470"
      role="img"
      aria-label={`Economic diagram: ${cases[mode].title}`}
    >
      <defs>
        <pattern
          id="hatchX"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#176b87" strokeWidth="3" />
        </pattern>
        <pattern
          id="hatchY"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#d56638" strokeWidth="3" />
        </pattern>
        <marker
          id="arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L7,3 z" fill="#172b36" />
        </marker>
      </defs>
      <line
        className="axis"
        x1={left}
        y1={base}
        x2={left}
        y2={top}
        markerEnd="url(#arrow)"
      />
      <line
        className="axis"
        x1={left}
        y1={base}
        x2={right}
        y2={base}
        markerEnd="url(#arrow)"
      />
      <text className="axisLabel" x={left - 6} y={22}>
        Costs / Benefits
      </text>
      <text className="axisLabel" x={right - 30} y={base + 30}>
        Quantity
      </text>
      <text x={left - 18} y={base + 20}>
        0
      </text>
      <path className="curve msb" d={path(msb, 5, 115)} />
      <path className="curve mpb" d={path(mpb, 0, 100)} />
      <path className="curve mpc" d={path(mpc, 0, 120)} />
      <text className="label purple" x={x(83)} y={y(msb(83)) - 12}>
        MSB
      </text>
      <text className="label blue" x={x(76)} y={y(mpb(76)) + 24}>
        MPB
      </text>
      <text className="label green" x={x(72)} y={y(mpc(72)) - 13}>
        MPC = MSC
      </text>
      {phase === "initial" && (
        <>
          <polygon points={under} fill="url(#hatchX)" opacity=".8" />
          <text className="areaLabel" x={underMidX} y={underMidY}>
            DWL X
          </text>
        </>
      )}
      {[qp, qs].map((q, i) => (
        <g key={q}>
          <line
            className="guide"
            x1={x(q)}
            y1={base}
            x2={x(q)}
            y2={i ? y(mpc(q)) : y(mpb(q))}
          />
          {!(i === 1 && phase === "solves") && (
            <text className="qLabel" x={x(q)} y={base + 24}>
              {i ? "Qs" : "Qp"}
            </text>
          )}
        </g>
      ))}
      <line
        className="mebLine"
        x1={x(qs) + 8}
        y1={y(mpb(qs))}
        x2={x(qs) + 8}
        y2={y(msb(qs))}
      />
      <text
        className="label orange"
        x={x(qs) + 18}
        y={(y(mpb(qs)) + y(msb(qs))) / 2}
      >
        MEB
      </text>
      {phase !== "initial" && (
        <>
          <line
            className="freeLine"
            x1={left}
            y1={base}
            x2={x(qstar)}
            y2={base}
          />
          <text className="freeLabel" x={left + 8} y={base - 10}>
            MPC′ = 0 (free)
          </text>
          <line
            className="guide"
            x1={x(qstar)}
            y1={base}
            x2={x(qstar)}
            y2={y(mpb(qstar))}
          />
          <text className="qLabel star" x={x(qstar)} y={base + 24}>
            {phase === "solves" ? "Qs = Q*" : "Q*"}
          </text>
        </>
      )}
      {phase === "worsens" && (
        <>
          <polygon points={over} fill="url(#hatchY)" opacity=".78" />
          <line
            className="dwlBoundary"
            x1={x(qstar)}
            y1={base}
            x2={x(qstar)}
            y2={y(mpc(qstar))}
          />
          <text className="areaLabel y" x={x(overMidQ)} y={overMidY}>
            DWL Y &gt; X
          </text>
        </>
      )}
      {phase === "solves" && (
        <>
          <line
            className="guide solvedGuide"
            x1={x(qs)}
            y1={base}
            x2={x(qs)}
            y2={y(mpc(qs))}
          />
          <text className="solvedLabel" x={x(qs) + 12} y={y(mpc(qs)) - 18}>
            Allocative efficiency
          </text>
        </>
      )}
      <circle className="point" cx={x(qp)} cy={y(mpb(qp))} r="5" />
      <circle className="point" cx={x(qs)} cy={y(mpc(qs))} r="5" />
    </svg>
  );
}

export default function Home() {
  const [mode, setMode] = useState<CaseKey>("horizontal");
  const [phase, setPhase] = useState<Phase>("initial");
  const displayMeb = mode === "horizontal" && phase === "worsens" ? 20 : 85;
  const mpcShift =
    phase === "initial"
      ? 0
      : phase === "solves"
        ? 85
        : mode === "parallel"
          ? 180
          : 0;
  const solvedMpcSlope = 0.75;
  const qp = Math.round(90 / (1 + solvedMpcSlope));
  const qs = Math.round((90 + displayMeb) / (1 + solvedMpcSlope));
  const after =
    phase === "initial"
      ? qp
      : mode === "horizontal" || phase === "worsens"
        ? 100
        : Math.round((90 + mpcShift) / (1 + solvedMpcSlope));
  const gap = after - qs;
  const verdict =
    phase === "initial"
      ? "MARKET FAILURE: UNDERCONSUMPTION"
      : phase === "solves"
        ? "MARKET FAILURE CORRECTED"
        : "POLICY WORSENS MARKET FAILURE";
  return (
    <main>
      <header className="hero">
        <div>
          <span className="eyebrow">H1 / H2 ECONOMICS · MARKET FAILURE</span>
          <h1>
            When does free provision
            <br />
            <em>solve or worsen market failure?</em>
          </h1>
        </div>
        <p>
          Compare two cases. In each one, see how free provision first corrects
          underconsumption, but can worsen the situation when consumption is
          pushed beyond the social optimum.
        </p>
      </header>
      <nav className="tabs" aria-label="Diagram cases">
        {(Object.keys(cases) as CaseKey[]).map((k) => (
          <button
            key={k}
            className={mode === k ? "active" : ""}
            onClick={() => {
              setMode(k);
              setPhase("initial");
            }}
          >
            <b>{cases[k].step}</b>
            <span>{cases[k].tab}</span>
          </button>
        ))}
      </nav>
      <nav className="phases" aria-label="Policy stages">
        <button
          className={phase === "initial" ? "active" : ""}
          onClick={() => setPhase("initial")}
        >
          <b>1</b>
          <span>Initial market failure</span>
        </button>
        <button
          className={phase === "solves" ? "active solves" : ""}
          onClick={() => setPhase("solves")}
        >
          <b>2</b>
          <span>Free provision solves</span>
        </button>
        <button
          className={phase === "worsens" ? "active worsens" : ""}
          onClick={() => setPhase("worsens")}
        >
          <b>3</b>
          <span>Free provision worsens</span>
        </button>
      </nav>
      <section className="workspace">
        <article className="graphCard">
          <div className="graphHead">
            <div>
              <span className="caseNo">
                CASE {cases[mode].step} · STAGE{" "}
                {phase === "initial" ? "1" : phase === "solves" ? "2" : "3"}
              </span>
              <h2>
                {phase === "initial"
                  ? "Initial market failure"
                  : phase === "solves"
                    ? "Free provision solves the market failure"
                    : "Free provision worsens the situation"}
              </h2>
            </div>
            <span
              className={`verdict ${phase === "solves" ? "works" : "risk"}`}
            >
              {verdict}
            </span>
          </div>
          <Diagram
            mode={mode}
            phase={phase}
            meb={displayMeb}
            mpcShift={mpcShift}
          />
          <div className="legend">
            <span>
              <i className="l msbL" />
              MSB
            </span>
            <span>
              <i className="l mpbL" />
              MPB
            </span>
            <span>
              <i className="l mpcL" />
              MPC = MSC
            </span>
            {phase !== "initial" && (
              <span>
                <i className="l freeL" />
                MPC′ after free provision
              </span>
            )}
          </div>
        </article>
        <aside className="panel">
          <span className="caseNo">THE ECONOMIC STORY</span>
          <h3>
            {phase === "initial"
              ? "Before intervention, the free market underconsumes at Qp because MPB is below MSB. The socially optimal quantity is Qs, so the underconsumption from Qp to Qs creates the original welfare loss X."
              : phase === "solves"
                ? mode === "horizontal"
                  ? "With sufficiently large MEB, free provision lowers MPC′ to zero and consumers choose Qs = Q*, where MPB = MPC′ = 0 and MSB = MSC. The original welfare loss is completely eliminated."
                  : "MPC shifts rightwards to MPC′ until MPC′ intersects MPB at Qs. The private outcome becomes Qa = Qs, so the original underconsumption and welfare loss X are completely eliminated."
                : mode === "horizontal"
                  ? "When MEB is smaller, the social optimum Qs lies before Q*. Free provision still makes MPC′ = 0, so consumers continue to Q*. The resulting overconsumption creates a new welfare loss Y that is larger than the original welfare loss X."
                  : "With full free provision, MPC′ = P = 0. Consumers continue to Q*, where MPB = MPC′ = 0. Since Q* exceeds Qs, the policy creates overconsumption and a new welfare loss Y that is larger than the original welfare loss X."}
          </h3>
          {mode === "horizontal" ? (
            <div className="metric">
              <span>
                {phase === "initial"
                  ? "Before free provision"
                  : phase === "solves"
                    ? "Successful free-provision condition"
                    : "Smaller MEB: policy overshoots"}
              </span>
              <strong>
                {phase === "solves" ? "Qs = Q*" : `MEB = ${displayMeb}`}
              </strong>
              <small>
                {phase === "initial"
                  ? "No MPC′ = 0 line. The shaded triangle is the original DWL X."
                  : phase === "solves"
                    ? "MPB = MPC′ = 0 and MSB = MSC at the same quantity. No DWL remains."
                    : "MPC′ remains zero, but Qs < Q*. The new DWL Y is larger than the original DWL X."}
              </small>
            </div>
          ) : (
            <div className="metric">
              <span>
                {phase === "initial"
                  ? "Before the MPC shift"
                  : phase === "solves"
                    ? "Correctly calibrated MPC shift"
                    : "Full free provision"}
              </span>
              <strong>
                {phase === "initial"
                  ? "DWL X"
                  : phase === "solves"
                    ? "Qa = Qs"
                    : "MPC′ = P = 0"}
              </strong>
              <small>
                {phase === "initial"
                  ? "The market underconsumes at Qp and the shaded triangle is the original DWL X."
                  : phase === "solves"
                    ? "MPC′ intersects MPB exactly at Qs. No DWL remains."
                  : "Consumers continue to Q*. Both the original DWL X and the larger new DWL Y are shown."}
              </small>
            </div>
          )}
          {mode === "parallel" && phase === "solves" && (
            <div className="metric shiftControl">
              <span>Rightward shift of MPC</span>
              <strong>{mpcShift}</strong>
              <small>
                {phase === "solves"
                  ? `The shift equals MEB (${displayMeb}), so Qa = Qs.`
                  : `The shift exceeds MEB, so Qa > Qs.`}
              </small>
            </div>
          )}
          <div className="quantities">
            <div>
              <span>Free market</span>
              <b>Qp = {qp}</b>
            </div>
            <div>
              <span>Social optimum</span>
              <b>Qs = {qs}</b>
            </div>
            <div>
              <span>
                {phase === "initial" ? "Current outcome" : "After policy"}
              </span>
              <b>
                {phase === "initial"
                  ? "Qp"
                  : mode === "horizontal" && phase === "solves"
                    ? "Qs = Q*"
                  : mode === "horizontal" || phase === "worsens"
                    ? "Q*"
                      : phase === "solves"
                        ? "Qs = Qa"
                        : "Qa"}{" "}
                = {after}
              </b>
            </div>
          </div>
          <div className="logic">
            <h4>Chain of analysis</h4>
            {mode === "horizontal" &&
              (phase === "initial" ? (
                <ol>
                  <li>
                    Positive externality means <b>MSB &gt; MPB</b>.
                  </li>
                  <li>
                    The free market equilibrium is <b>Qp</b>, where MPB = MPC.
                  </li>
                  <li>
                    The social optimum is <b>Qs</b>, where MSB = MSC.
                  </li>
                  <li>
                    Since <b>Qp &lt; Qs</b>, the market underconsumes and
                    creates <b>DWL X</b>.
                  </li>
                </ol>
              ) : phase === "solves" ? (
                <ol>
                  <li>
                    Free provision lowers <b>MPC′ to zero</b>.
                  </li>
                  <li>
                    Consumers choose where <b>MPB = MPC′ = 0</b>.
                  </li>
                  <li>
                    This occurs at <b>Qs = Q*</b>, which also satisfies{" "}
                    <b>MSB = MSC</b>.
                  </li>
                  <li>
                    The original welfare loss is eliminated, so{" "}
                    <b>no DWL remains</b>.
                  </li>
                </ol>
              ) : (
                <ol>
                  <li>
                    A smaller MEB shifts MSB down and moves <b>Qs leftwards</b>.
                  </li>
                  <li>
                    Free provision still sets <b>MPC′ = 0</b>.
                  </li>
                  <li>
                    Consumers therefore continue to <b>Q*</b>, where MPB = MPC′.
                  </li>
                  <li>
                    Since <b>Q* &gt; Qs</b>, overconsumption creates{" "}
                    <b>DWL Y</b>.
                  </li>
                  <li>
                    The new <b>DWL Y is larger than the original DWL X</b>.
                  </li>
                </ol>
              ))}
            {mode === "parallel" &&
              (phase === "initial" ? (
                <ol>
                  <li>
                    The free market equilibrium is <b>Qp</b>, where MPB = MPC.
                  </li>
                  <li>
                    The social optimum is <b>Qs</b>, where MSB = MSC.
                  </li>
                  <li>
                    Since <b>Qp &lt; Qs</b>, underconsumption creates the
                    original <b>DWL X</b>.
                  </li>
                </ol>
              ) : phase === "solves" ? (
                <ol>
                  <li>
                    MPC shifts rightwards to <b>MPC′</b>.
                  </li>
                  <li>
                    The shift equals MEB, so MPC′ intersects MPB exactly at{" "}
                    <b>Qs</b>.
                  </li>
                  <li>
                    The new private outcome is <b>Qa = Qs</b>.
                  </li>
                  <li>
                    The original welfare loss is eliminated, so{" "}
                    <b>no DWL remains</b>.
                  </li>
                </ol>
              ) : (
                <ol>
                  <li>Full free provision sets <b>MPC′ = P = 0</b>.</li>
                  <li>Consumers continue to <b>Q*</b>, where MPB = MPC′ = 0.</li>
                  <li>Since <b>Q* &gt; Qs</b>, the policy causes overconsumption.</li>
                  <li>The original underconsumption loss <b>X</b> is shown.</li>
                  <li>The new overconsumption loss <b>Y is larger than X</b>.</li>
                </ol>
              ))}
          </div>
          <div className="exam">
            <span>EXAM-READY EVALUATION</span>
            <p>
              Free provision improves welfare only up to Qs. If it reduces the
              private cost by more than the MEB, consumption exceeds Qs and the
              policy replaces the original welfare loss X with a new welfare
              loss Y. Accurate estimation and calibration are therefore
              essential.
            </p>
          </div>
        </aside>
      </section>
      <footer>
        <b>Core condition</b>
        <span>
          Free provision is allocatively efficient only when the quantity chosen
          at zero private cost equals Qs, where MSB = MSC.
        </span>
      </footer>
    </main>
  );
}
