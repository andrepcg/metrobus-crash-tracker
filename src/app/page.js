import Image from "next/image";
import Contador from "@/components/Contador";
import { getUltimoAcidente, getAllAcidentes, getTotalAcidentes } from "@/lib/acidentes";

export default function Home() {
  const ultimoAcidente = getUltimoAcidente();
  const acidentes = getAllAcidentes();
  const totalAcidentes = getTotalAcidentes();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center gap-4">
          <Image
            src="/metro-mondego.svg"
            alt="Metro Mondego logo"
            width={120}
            height={45}
            priority
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-zinc-100">
            MetroBus <span className="text-metrobus">Bateu</span>?
          </h1>
          <p className="text-zinc-500 text-base sm:text-lg max-w-xl mx-auto">
            Um contador humorístico dos acidentes do Metrobus em Coimbra.
            Porque rir é o melhor remédio... para além de travões.
          </p>
        </div>

        {/* Timer */}
        {ultimoAcidente && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-10 mb-8">
            <p className="text-center text-zinc-500 text-sm mb-6 uppercase tracking-wide">
              Tempo desde o último acidente
            </p>
            <Contador dataUltimoAcidente={ultimoAcidente.data} />
          </div>
        )}

        {/* Last Accident Info */}
        {ultimoAcidente && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-3 h-3 bg-metrobus rounded-full animate-pulse"></span>
              <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
                Último Acidente
              </h2>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-100 mb-2">
              {ultimoAcidente.titulo}
            </h3>
            <p className="text-zinc-400 mb-3">
              📍 {ultimoAcidente.local} &middot; 📅{" "}
              {new Date(ultimoAcidente.data).toLocaleDateString("pt-PT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {" às "}
              {new Date(ultimoAcidente.data).toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {ultimoAcidente.fonte && (
              <a
                href={ultimoAcidente.fonte}
                target="_blank"
                rel="noopener noreferrer"
                className="text-metrobus hover:underline text-sm"
              >
                Ver notícia →
              </a>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mb-12">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center max-w-xs mx-auto">
            <span className="text-4xl sm:text-5xl font-bold text-metrobus">{totalAcidentes}</span>
            <p className="text-zinc-500 mt-2">acidentes registados</p>
          </div>
        </div>

        {/* Accident History */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-zinc-100">
            Histórico de Acidentes 🚧
          </h2>
          <div className="space-y-4">
            {acidentes.map((acidente, index) => (
              <div
                key={acidente.slug}
                className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-5 hover:border-metrobus/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                        #{totalAcidentes - index}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {new Date(acidente.data).toLocaleDateString("pt-PT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        {" às "}
                        {new Date(acidente.data).toLocaleTimeString("pt-PT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h3 className="font-medium text-zinc-200 mb-1">{acidente.titulo}</h3>
                    <p className="text-sm text-zinc-500">📍 {acidente.local}</p>
                  </div>
                  {acidente.fonte && (
                    <a
                      href={acidente.fonte}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-metrobus hover:underline text-sm shrink-0"
                    >
                      Fonte
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-zinc-600 text-sm">
            Este site é uma paródia e não tem qualquer afiliação oficial com o Metro Mondego.
          </p>
          <p className="text-zinc-700 text-xs mt-2">
            Feito com 🚋 em Coimbra
          </p>
          <a
            href="https://github.com/andrepcg/metrobus-crash-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-metrobus text-xs mt-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
