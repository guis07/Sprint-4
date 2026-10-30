
import { useState } from "react";

function Home() {
  const [mensagemEnviada, setMensagemEnviada] = useState(false);

  function enviarMensagem(event) {
    event.preventDefault();
    setMensagemEnviada(true);
    event.currentTarget.reset();
  }

  return (
    <main className="m-0 w-full max-w-none bg-[#080808] p-0 font-sans text-white">
      {/* Apresentação */}
      <section className="grid min-h-[85vh] grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-[10%]">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[3px] text-cyan-400">
            Challenge JOVI · Câmera
          </span>

          <h1 className="my-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Conteúdo capturado.
            <span className="block text-cyan-400">
              Organizado para estudar.
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
            A SmartScan transforma suas capturas em lembretes,
            materiais organizados e apoio de IA para estudar.
          </p>

          <a
            href="#solucao"
            className="inline-block rounded-full bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:-translate-y-1 hover:bg-cyan-300"
          >
            Ver como funciona
          </a>
        </div>

        <div className="flex justify-center">
          <div className="w-56 rounded-[35px] border-4 border-gray-700 bg-[#111] p-2 shadow-2xl sm:w-64">
            <img
              src="/images/tela-inicial.png"
              alt="Tela inicial do protótipo SmartScan"
              className="w-full rounded-[27px]"
            />
          </div>
        </div>
      </section>

      {/* Solução */}
      <section
        id="solucao"
        className="scroll-mt-8 px-6 py-16 sm:px-10 lg:px-[10%] lg:py-24"
      >
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          A Solução
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-[#151515] p-7 sm:p-9">
            <h3 className="mb-4 text-2xl font-semibold">
              Por que a SmartScan?
            </h3>

            <p className="mb-5 leading-7 text-gray-300">
              Durante os estudos, o celular ajuda a registrar conteúdos
              importantes. Mas, sem organização ou um lembrete, essas
              capturas podem acabar esquecidas na galeria.
            </p>

            <ul className="list-disc space-y-2 pl-5 text-gray-300">
              <li>Conteúdos importantes ficam perdidos entre outras fotos.</li>
              <li>Não há um lembrete para revisar o material.</li>
              <li>Falta organização para encontrar os conteúdos depois.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-cyan-400 bg-[#151515] p-7 sm:p-9">
            <span className="mb-3 block text-4xl text-cyan-400">◎</span>

            <h3 className="mb-4 text-2xl font-semibold">
              Um novo modo: Scan
            </h3>

            <p className="leading-7 text-gray-300">
              Um modo dedicado na câmera do JOVI que digitaliza e melhora
              suas capturas, permite organizar conteúdos em pastas, criar
              alarmes de revisão e contar com IA para auxiliar nos estudos
              com resumos e exercícios.
            </p>
          </article>
        </div>
      </section>

      {/* Como funciona */}
      <section
        id="como-funciona"
        className="scroll-mt-8 bg-[#101010] px-6 py-16 sm:px-10 lg:px-[10%] lg:py-24"
      >
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          Como funciona?
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              numero: "01",
              titulo: "Escaneie",
              texto:
                "Abra o modo Scan e fotografe a lousa, o caderno ou o slide da aula.",
            },
            {
              numero: "02",
              titulo: "Personalize o alarme",
              texto:
                "Escolha o dia, o horário e o som do lembrete de revisão.",
            },
            {
              numero: "03",
              titulo: "Organização fácil",
              texto:
                "Crie pastas personalizadas para manter seus conteúdos organizados.",
            },
            {
              numero: "04",
              titulo: "Estude com IA",
              texto:
                "Use a IA para criar resumos, exercícios, gráficos e tirar dúvidas.",
            },
          ].map((etapa) => (
            <article
              key={etapa.numero}
              className="rounded-2xl border border-transparent bg-[#181818] p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <span className="text-2xl font-bold text-cyan-400">
                {etapa.numero}
              </span>

              <h3 className="my-4 text-xl font-semibold">
                {etapa.titulo}
              </h3>

              <p className="text-sm leading-6 text-gray-400">
                {etapa.texto}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Público-alvo */}
      <section
        id="publico"
        className="scroll-mt-8 px-6 py-16 sm:px-10 lg:px-[10%] lg:py-24"
      >
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          Público-Alvo
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              titulo: "Quem tem a rotina cheia",
              texto:
                "Estudantes que fotografam conteúdos, mas nem sempre têm tempo para organizar tudo depois.",
            },
            {
              titulo: "Quem estuda sozinho",
              texto:
                "Pessoas que organizam a própria rotina e precisam de ajuda para não deixar a matéria acumular.",
            },
            {
              titulo: "Quem fotografa e esquece",
              texto:
                "Quem já tirou foto de uma lousa inteira e nunca mais abriu aquela imagem.",
            },
          ].map((item) => (
            <article
              key={item.titulo}
              className="rounded-2xl bg-[#151515] p-7 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <h3 className="mb-3 text-xl font-semibold">{item.titulo}</h3>
              <p className="leading-7 text-gray-400">{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section className="px-6 py-16 sm:px-10 lg:px-[10%] lg:py-24">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          Benefícios
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              numero: "01",
              titulo: "Lembretes de revisão",
              texto: "O alarme avisa na hora certa para voltar ao conteúdo.",
            },
            {
              numero: "02",
              titulo: "Estudos organizados",
              texto: "Crie pastas para encontrar seus conteúdos com facilidade.",
            },
            {
              numero: "03",
              titulo: "Conteúdo aproveitado",
              texto: "Suas capturas passam a fazer parte dos seus estudos.",
            },
            {
              numero: "04",
              titulo: "IA sempre à mão",
              texto: "Crie resumos, exercícios e organize informações.",
            },
          ].map((item) => (
            <article
              key={item.numero}
              className="rounded-2xl border border-[#292929] p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <strong className="text-2xl text-cyan-400">
                {item.numero}
              </strong>

              <h3 className="my-4 text-lg font-semibold">{item.titulo}</h3>
              <p className="text-sm leading-6 text-gray-400">{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Galeria */}
      <section
        id="galeria"
        className="scroll-mt-8 bg-[#101010] px-6 py-16 sm:px-10 lg:px-[10%] lg:py-24"
      >
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Galeria do Protótipo
        </h2>

        <p className="mb-10 text-gray-400">
          Telas do protótipo, do modo Scan à conversa com a IA.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              imagem: "tela-inicial.png",
              titulo: "Modo Scan na câmera",
            },
            {
              imagem: "tela-foco.png",
              titulo: "Captura do conteúdo",
            },
            {
              imagem: "tela-alarme.png",
              titulo: "Alarme personalizado",
            },
            {
              imagem: "tela-galeria.png",
              titulo: "Pastas por matéria",
            },
            {
              imagem: "tela-ia.png",
              titulo: "Chat com a IA",
            },
          ].map((item) => (
            <figure
              key={item.imagem}
              className="overflow-hidden rounded-2xl border border-[#292929] bg-[#181818] p-3"
            >
              <img
                src={`/images/${item.imagem}`}
                alt={item.titulo}
                className="h-[360px] w-full rounded-xl bg-black object-contain sm:h-[400px]"
                loading="lazy"
              />

              <figcaption className="px-2 py-4 text-sm text-gray-300">
                {item.titulo}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-6 text-2xl font-semibold">
            Vídeo do Protótipo
          </h3>

          <video
            controls
            preload="metadata"
            className="mx-auto max-h-[600px] w-full max-w-3xl rounded-2xl bg-black"
          >
            <source src="/images/prototipo.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>
      </section>

      {/* Equipe */}
      <section
        id="equipe"
        className="scroll-mt-8 px-6 py-16 sm:px-10 lg:px-[10%] lg:py-24"
      >
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          Nossa Equipe
        </h2>

        <div className="grid grid-cols-1 gap-5 min-[450px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[
            {
              iniciais: "GG",
              nome: "Gabriela Gomes",
              rm: "RM 568797",
              funcao: "UX/UI e Prototipação",
            },
            {
              iniciais: "ST",
              nome: "Sophia Trindade",
              rm: "RM 570349",
              funcao: "Desenvolvimento Front-end",
            },
            {
              iniciais: "SC",
              nome: "Sofia Costa",
              rm: "RM 570339",
              funcao: "Conteúdo e Documentação",
            },
            {
              iniciais: "GS",
              nome: "Gabriell Santos",
              rm: "RM 574134",
              funcao: "Pesquisa e Solução",
            },
            {
              iniciais: "GC",
              nome: "Guilherme Correia",
              rm: "RM 570551",
              funcao: "Apresentação e Vídeo",
            },
          ].map((pessoa) => (
            <article
              key={pessoa.rm}
              className="rounded-2xl bg-[#151515] p-5 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 font-bold text-black">
                {pessoa.iniciais}
              </div>

              <h3 className="font-semibold">{pessoa.nome}</h3>
              <p className="mt-1 text-xs text-gray-400">{pessoa.rm}</p>
              <p className="mt-3 text-sm text-gray-300">{pessoa.funcao}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section
        id="contato"
        className="scroll-mt-8 bg-[#101010] px-6 py-16 sm:px-10 lg:px-[10%] lg:py-24"
      >
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Contato</h2>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">
              Quer saber mais sobre a SmartScan?
            </h3>

            <p className="mb-6 leading-7 text-gray-400">
              Fale com a gente para conhecer melhor a solução e o protótipo.
            </p>

            <p className="break-words text-gray-300">
              <strong>E-mail:</strong>{" "}
              equipe.smartscan@email.com
            </p>
          </div>

          <form onSubmit={enviarMensagem} className="flex flex-col gap-3">
            <label htmlFor="nome" className="text-sm">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Seu nome"
              required
              className="rounded-xl border border-[#333] bg-[#191919] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <label htmlFor="email" className="text-sm">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Seu e-mail"
              required
              className="rounded-xl border border-[#333] bg-[#191919] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <label htmlFor="mensagem" className="text-sm">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="4"
              placeholder="Digite sua mensagem..."
              required
              className="rounded-xl border border-[#333] bg-[#191919] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              className="mt-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Enviar mensagem
            </button>

            {mensagemEnviada && (
              <p className="mt-2 text-sm text-cyan-400" role="status">
                Mensagem enviada com sucesso!
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default Home;
