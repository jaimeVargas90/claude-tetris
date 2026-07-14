import Link from "next/link";

export default function NotFound() {
  return (
    <div className="av-detail fade-in" style={{ gridTemplateColumns: "1fr", textAlign: "center", padding: "80px 32px" }}>
      <div>
        <div className="pixel neon-magenta" style={{ fontSize: 22, marginBottom: 16 }}>
          404 · JUEGO NO ENCONTRADO
        </div>
        <p style={{ color: "var(--ink-dim)", marginBottom: 24 }}>
          Este cartucho no existe en el Vault.
        </p>
        <Link href="/" className="btn lg">
          VOLVER AL VAULT
        </Link>
      </div>
    </div>
  );
}
