import React, { useState, useEffect } from 'react';
import './FondoRadar.css';

const FondoRadar = () => {
  const [puntos, setPuntos] = useState([]);
  const [velocidad, setVelocidad] = useState(4); // Segundos por rotación

  // Función para colocar pequeños destellos aleatorios en el grid
  const generarPuntosAleatorios = () => {
    const nuevosPuntos = Array.from({ length: 12 }, () => ({
      id: Math.random(),
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
    }));
    setPuntos(nuevosPuntos);
  };

  useEffect(() => {
    generarPuntosAleatorios();
    const interval = setInterval(generarPuntosAleatorios, 3000);
    return () => clearInterval(interval);
  }, []);

  const cambiarVelocidad = () => {
    // Ciclar entre velocidades: 4s -> 2s -> 1s -> 4s
    setVelocidad((prev) => (prev === 4 ? 2 : prev === 2 ? 1 : 4));
  };

  return (
    <div className="radar-container" onClick={cambiarVelocidad}>
      <div className="radar-grid"></div>
      <div className="radar-scan" style={{ animationDuration: `${velocidad}s` }}></div>
      <div className="radar-center"></div>
      
      {puntos.map((punto) => (
        <div
          key={punto.id}
          className="radar-point"
          style={{
            left: `${punto.x}%`,
            top: `${punto.y}%`,
          }}
        ></div>
      ))}
      
      <div className="radar-info">
        Velocidad: {velocidad}s | Clic para cambiar
      </div>
    </div>
  );
};

export default FondoRadar;
