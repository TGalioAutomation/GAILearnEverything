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
  const [fb, setFb] = useState(null);

  useEffect(() => {
    const l = loadLearner();
    if (!l) router.replace("/onboarding");
    else setLearner(l);
  }, [router]);

  const unit = useMemo(() => {
    if (!learner) return null;
    return SCRIPTS[learner.lang][learner.persona][idx];
  }, [learner, idx]);

  if (!learner || !unit) return null;
  const p = PERSONAS[learner.persona];

  function listen() {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) return;
    const r = new Rec();
    r.lang = learner.lang === "zh" ? "zh-CN" : "en-US";
    r.onresult = (e) => setSaid(e.results[0][0].transcript);
    r.start();
  }

  function submit() {
    const result = coach(said, unit.sample);
    setFb(result);
    logSpeak({
      persona: learner.persona,
      lang: learner.lang,
      prompt: unit.prompt,
      said,
      ok: result.ok,
    });
  }

  return (
    <main className="wrap">
      <div className="brand">HÔM NAY PHẢI NÓI</div>
      <h1>{p.name}</h1>
      <p className="lead">{learner.lang === "zh" ? "Tiếng Trung" : "Tiếng Anh"} · {learner.pace} phút</p>

      <div className="card">
        <span className="tag">Tình huống {idx + 1}/3</span>
        <p>{unit.prompt}</p>
        <p className="lead">Mẫu: {unit.sample}</p>
        <textarea value={said} onChange={(e) => setSaid(e.target.value)} placeholder="Nói hoặc gõ câu của bạn..." />
        <div className="row">
          <button className="btn ghost" type="button" onClick={listen}>Nói</button>
          <button className="btn" type="button" onClick={submit}>Xong — sửa lỗi</button>
        </div>
      </div>

      {fb && (
        <div className="card">
          <p className={fb.ok ? "ok" : "warn"}>{fb.note}</p>
          <p>Câu tốt hơn: {fb.next}</p>
          <button className="btn ghost" onClick={() => { setFb(null); setSaid(""); setIdx((i) => (i + 1) % 3); }}>
            Tình huống tiếp
          </button>
        </div>
      )}
      <Nav active="today" />
    </main>
  );
}
