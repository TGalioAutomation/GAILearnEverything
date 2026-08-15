import Link from "next/link";

export default function Home() {
  return (
    <main className="hero-wrap">
      <span className="stamp">PQTV</span>
      <h1>Nói được việc hôm nay.</h1>
      <p className="lead">
        Tiếng Anh hoặc tiếng Trung. Người Việt mới bắt đầu. Giáo trình là ca làm của bạn — không phải 1000 từ vô chủ.
      </p>
      <div className="sheet">
        <h2>Một ngày học</h2>
        <p>1. Mở miệng &nbsp; 2. Sửa một lỗi &nbsp; 3. Ôn câu đã dùng</p>
      </div>
      <div style={{ marginTop: "auto" }}>
        <Link className="btn son" href="/onboarding">Bắt đầu ca học</Link>
      </div>
    </main>
  );
}
