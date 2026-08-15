"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PERSONAS, SCRIPTS, coach } from "@/lib/personas";
import { loadLearner, logSpeak } from "@/lib/store";
import Nav from "@/app/components/Nav";

export default function Today() {
  const router = useRouter();
  const [learner, setLearner] = useState(null);
  const [idx, setIdx] = useState(0);
  const [said, setSaid] = useState("");
  const [live, setLive] = useState(false);
  const [fb, setFb] = useState(null);

  useEffect(() => {
    const l = loadLearner();
    if (!l) router.replace("/onboarding");
    else setLearner(l);
  }, [router]);

  const unit = useMemo(() => learner && SCRIPTS[learner.lang][learner.persona][idx], [learner, idx]);
  if (!learner || !unit) return null;
  const p = PERSONAS[learner.persona];

  function listen() {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) return;
    const r = new Rec();
    r.lang = learner.lang === "zh" ? "zh-CN" : "en-US";
    r.onstart = () => setLive(true);
    r.onend = () => setLive(false);
    r.onresult = (e) => setSaid(e.results[0][0].transcript);
    r.start();
  }

  function submit() {
    const result = coach(said, unit.sample);
    setFb(result);
    logSpeak({ persona: learner.persona, lang: learner.lang, prompt: unit.prompt, said, ok: result.ok });
    setLearner(loadLearner());
  }

  return (
    <main className="wrap">
      <span className="stamp">{learner.lang === "zh" ? "中文" : "EN"} · {p.name}</span>
      <h1>Mở miệng.</h1>
      <p className="lead">Tình huống {idx + 1}/3 — {unit.prompt}</p>

      <div className="sheet">
        <h2>Nói như đang trong ca</h2>
        <p className="sample">{unit.sample}</p>
        <button className={`mic ${live ? "live" : ""}`} onClick={listen}>{live ? "..." : "NÓI"}</button>
        <textarea value={said} onChange={(e) => setSaid(e.target.value)} placeholder="Hoặc gõ nếu nơi ồn" />
        <button className="btn ink" onClick={submit}>Sửa câu này</button>
      </div>

      {fb && (
        <div className="sheet">
          <p className={fb.ok ? "ok" : "warn"}>{fb.note}</p>
          <div className="jade-box">Câu tốt hơn: {fb.next}</div>
          <button className="btn ghost" onClick={() => { setFb(null); setSaid(""); setIdx((i) => (i + 1) % 3); }}>Tình huống tiếp</button>
        </div>
      )}
      <Nav active="today" />
    </main>
  );
}
