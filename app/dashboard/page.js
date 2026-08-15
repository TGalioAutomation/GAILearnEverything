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
  const okJobs = [...new Set(speaks.filter((s) => s.ok).map((s) => s.prompt))];

  return (
    <main className="wrap">
      <div className="brand">VIỆC BẠN NÓI ĐƯỢC</div>
      <h1>Hôm nay nói được gì?</h1>
      <p className="lead">{p.name} · {okJobs.length}/3 tình huống đã nói đủ ý</p>

      <div className="card">
        <p>3 tình huống phải chinh phục</p>
        {p.jobs.map((j) => (
          <p key={j}>{okJobs.some((x) => x.includes(j.slice(0, 8))) ? "✓" : "○"} {j}</p>
        ))}
      </div>

      <div className="card">
        <p>Lần nói gần nhất</p>
        {speaks.slice(0, 5).map((s, i) => (
          <p key={i} className={s.ok ? "ok" : "warn"}>{s.said || "(im lặng)"} — {s.prompt}</p>
        ))}
        {speaks.length === 0 && <p className="lead">Chưa nói. Chưa học.</p>}
      </div>
      <Nav active="dash" />
    </main>
  );
}
