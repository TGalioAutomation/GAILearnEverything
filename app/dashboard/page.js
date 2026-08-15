"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PERSONAS } from "@/lib/personas";
import { loadLearner } from "@/lib/store";
import Nav from "@/app/components/Nav";

export default function Dashboard() {
  const router = useRouter();
  const [learner, setLearner] = useState(null);
  useEffect(() => {
    const l = loadLearner();
    if (!l) router.replace("/onboarding");
    else setLearner(l);
  }, [router]);
  if (!learner) return null;
  const p = PERSONAS[learner.persona];
  const speaks = learner.speaks || [];
  const ok = speaks.filter((s) => s.ok);

  return (
    <main className="wrap">
      <span className="stamp">Không phải XP</span>
      <h1>Hôm nay nói được gì?</h1>
      <p className="lead">{p.name}. North star: 3 tình huống, không đọc script.</p>

      <div className="sheet">
        <h2>3 việc phải chinh phục</h2>
        {p.jobs.map((j, i) => {
          const done = ok.some((s) => s.prompt && (s.prompt.includes(j.slice(0, 6)) || i === 0 && ok.length > i));
          return (
            <div className="job" key={j}>
              <span className={`dot ${ok.length > i ? "done" : ""}`}>{ok.length > i ? "✓" : i + 1}</span>
              <div><b>{j}</b></div>
            </div>
          );
        })}
      </div>

      <div className="sheet">
        <h2>Lần mở miệng gần nhất</h2>
        {speaks.slice(0, 4).map((s, i) => (
          <p key={i} className={s.ok ? "ok" : "warn"}>{s.said || "(im)"}</p>
        ))}
        {!speaks.length && <p className="lead">Chưa nói. Chưa học.</p>}
      </div>
      <Nav active="dash" />
    </main>
  );
}
