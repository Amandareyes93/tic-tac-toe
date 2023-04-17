import React from 'react';
import Square from '../square';

export default function Winner({winner, onClickButton}) {
  return (
    <>
      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? 'Empate' : 'Gano'}</h2>

            <header>{winner && <Square>{winner}</Square>}</header>

            <footer>
              <button onClick={onClickButton}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </>
  );
}
