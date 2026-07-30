export function Brand({ href = "/" }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label="Invio — página inicial">
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M7 5.5h18l8 8v8.5h-5v-6.5h-6V10H12v20h9v5H7z" />
        <path className="brand-mark-arrow" d="m20 28 8-7v4h7v6h-7v4z" />
        <path className="brand-mark-lines" d="M15 17h6M15 22h7M15 27h3" />
      </svg>
      <span>invio</span>
    </a>
  );
}
