function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">J</span>

          <div>
            <h1>Jovi</h1>
            <p>Camera</p>
          </div>
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          Modo Scan
        </div>
      </div>
    </header>
  );
}

export default Header;