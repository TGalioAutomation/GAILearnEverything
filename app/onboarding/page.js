"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PERSONAS } from "@/lib/personas";
import { saveLearner } from "@/lib/store";

export default function Onboarding() {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const [persona, setPersona] = useState("sales");
  const [pace, setPace] = useState(10);

  function start() {
    saveLearner({ lang, persona, pace, level: "zero", startedAt: new Date().toISOString(), speaks: [] });
    router.push("/today");
  }

  return (
    <main className="wrap">
      <span className="stamp">Chọn việc</span>
      <h1>Bạn phải nói gì mỗi ngày?</h1>

      <div className="sheet">
        <h2>Ngôn ngữ — một cái</h2>
        <div className="row two">
          <button className={`choice ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}><b>Tiếng Anh</b><small>Khách Tây, mail</small></button>
          <button className={`choice ${lang === "zh" ? "on" : ""}`} onClick={() => setLang("zh")}><b>Tiếng Trung</b><small>Sếp, NCC, xưởng</small></button>
        </div>
      </div>

      <div className="sheet">
        <h2>Ca làm</h2>
        <div className="row">
          {Object.values(PERSONAS).map((p) => (
            <button key={p.id} className={`choice ${persona === p.id ? "on" : ""}`} onClick={() => setPersona(p.id)}>
              <b>{p.name}</b>
              <small>{p.jobs[0]}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="sheet">
        <h2>Phút / ngày</h2>
        <div className="row two">
          {[10, 20, 40].map((n) => (
            <button key={n} className={`choice ${pace === n ? "on" : ""}`} onClick={() => setPace(n)}><b>{n}</b></button>
          ))}
        </div>
      </div>

      <button className="btn son" onClick={start}>Nói câu việc đầu tiên</button>
    </main>
  );
}
