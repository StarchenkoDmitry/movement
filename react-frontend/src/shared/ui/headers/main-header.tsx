export function MainHeader() {
  return (
    <header className="bg-white">
      <span className="text-2xl font-mono">
        <a href="/">Movement</a>
      </span>
      <span>Kek</span>
      <nav className="inline-flex *:text-sky-500">
        <a href="/" className="">Home</a>
        <a href="/auth">Auth</a>
        <a href="/me">Me</a>
      </nav>
    </header>
  );
}
