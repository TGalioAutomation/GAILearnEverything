import Link from "next/link";

export default function Nav({ active }) {
  return (
    <nav className="dock">
      <Link className={active === "today" ? "on" : ""} href="/today">Nói</Link>
      <Link className={active === "dash" ? "on" : ""} href="/dashboard">Việc</Link>
      <Link href="/onboarding">Đổi ca</Link>
    </nav>
  );
}
