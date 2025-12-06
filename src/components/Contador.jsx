'use client';

import { useState, useEffect } from 'react';

export default function Contador({ dataUltimoAcidente }) {
  const [tempo, setTempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const calcularTempo = () => {
      const agora = new Date();
      const ultimoAcidente = new Date(dataUltimoAcidente);
      const diferenca = agora - ultimoAcidente;

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      setTempo({ dias, horas, minutos, segundos });
    };

    calcularTempo();
    const intervalo = setInterval(calcularTempo, 1000);

    return () => clearInterval(intervalo);
  }, [dataUltimoAcidente]);

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
      <div className="flex flex-col">
        <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-metrobus tabular-nums">
          {tempo.dias}
        </span>
        <span className="text-sm sm:text-base text-zinc-500 mt-2">
          {tempo.dias === 1 ? 'dia' : 'dias'}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-metrobus tabular-nums">
          {String(tempo.horas).padStart(2, '0')}
        </span>
        <span className="text-sm sm:text-base text-zinc-500 mt-2">
          {tempo.horas === 1 ? 'hora' : 'horas'}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-metrobus tabular-nums">
          {String(tempo.minutos).padStart(2, '0')}
        </span>
        <span className="text-sm sm:text-base text-zinc-500 mt-2">
          {tempo.minutos === 1 ? 'minuto' : 'minutos'}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-metrobus tabular-nums">
          {String(tempo.segundos).padStart(2, '0')}
        </span>
        <span className="text-sm sm:text-base text-zinc-500 mt-2">
          {tempo.segundos === 1 ? 'segundo' : 'segundos'}
        </span>
      </div>
    </div>
  );
}

