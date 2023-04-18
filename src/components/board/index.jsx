import React, { useState } from 'react';
import { TURNS, WINNER_COMBOS } from './constants';
import Square from '../square';
import confetti from 'canvas-confetti';
import Turn from '../turn';
import Winner from '../winner';

export default function Board() {
  debugger;
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    // si no hay ganador
    return null;
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  };
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };
  const updateBoard = (event, index, board, turn) => {
    // si ya tiene algo o ya hay ganador, no actualizo esta posicion, no me dejes seguir jugando
    if (board[index] || winner) return;

    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    // revisar si hay ganador o si termino el juego empatado
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>

      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} onClick={(e) => updateBoard(e, index, board, turn)}>
              {square}
            </Square>
          );
        })}
      </section>

      <Turn isSelected={turn === TURNS.X} />
      <Winner winner={winner} onClickButton={resetGame} />
    </main>
  );
}
