import "./globals.css";

export const metadata = {
  title: "PQTV — Nói được việc",
  description: "Gia sư AI tiếng Anh và tiếng Trung cho người Việt đang đi làm",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
