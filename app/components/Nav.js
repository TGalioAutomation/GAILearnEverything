import Link from "next/link";

export default function Nav({ active }) {
  return (
    <nav className="bottom">
      <Link className={active === "today" ? "on" : ""} href="/today">Nói</Link>
      <Link className={active === "dash" ? "on" : ""} href="/dashboard">Việc làm được</Link>
      <Link href="/onboarding">Đổi việc</Link>
    </nav>
  );
}
