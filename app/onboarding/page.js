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
    saveLearner({
      lang,
      persona,
      pace,
      level: "zero",
      startedAt: new Date().toISOString(),
      speaks: [],
    });
    router.push("/today");
  }

  return (
    <main className="wrap">
      <div className="brand">ONBOARDING</div>
      <h1>4 tín hiệu. Rồi nói ngay.</h1>

      <div className="card">
        <p>1. Ngôn ngữ — chỉ một</p>
        <div className="row">
          <button className={`choice ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}>Tiếng Anh</button>
          <button className={`choice ${lang === "zh" ? "on" : ""}`} onClick={() => setLang("zh")}>Tiếng Trung</button>
        </div>
      </div>

      <div className="card">
        <p>2. Việc của bạn</p>
        <div className="row">
          {Object.values(PERSONAS).map((p) => (
            <button key={p.id} className={`choice ${persona === p.id ? "on" : ""}`} onClick={() => setPersona(p.id)}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <p>3. Level: mới hoàn toàn</p>
        <span className="tag">Zero — khóa v1</span>
      </div>

      <div className="card">
        <p>4. Phút mỗi ngày</p>
        <div className="row">
          {[10, 20, 40].map((n) => (
            <button key={n} className={`choice ${pace === n ? "on" : ""}`} onClick={() => setPace(n)}>{n} phút</button>
          ))}
        </div>
      </div>

      <button className="btn" onClick={start}>Nói câu việc đầu tiên</button>
    </main>
  );
}
