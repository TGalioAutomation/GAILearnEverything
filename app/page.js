import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <div className="brand">PQTV · GAILearnEverything</div>
      <h1>Nói được việc. Không học chung chung.</h1>
      <p className="lead">
        Tiếng Anh hoặc tiếng Trung cho người Việt mới hoàn toàn. Giáo trình là ca làm của bạn.
      </p>
      <div className="card">
        <p>Mỗi ngày: mở miệng → sửa 1 lỗi → ôn câu đã dùng.</p>
        <p className="ok">Thành công = 30 ngày nói được 3 tình huống việc, không đọc script.</p>
      </div>
      <Link className="btn" href="/onboarding">Bắt đầu — 1 phút</Link>
    </main>
  );
}
