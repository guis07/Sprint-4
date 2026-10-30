
function Footer() {
  return (
    <footer className="bg-[#0b1120] border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
            J
          </div>

          <div>
            <p className="font-bold">Jovi Camera</p>
            <p className="text-xs text-slate-400">
              Tecnologia para facilitar sua leitura
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-500 text-center">
          © 2026 Jovi Camera. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}

export default Footer;