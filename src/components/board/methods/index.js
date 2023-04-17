const updateBoard = (index) => {
  debugger
  // si ya tiene algo, no actualizo esta posicion
  if (board[index] || winner) return;

  //actualizar el tablero
  const newBoard = [...board];
  newBoard[index] = turn;
  console.log(newBoard[index], turn);
  setBoard(newBoard);
  console.log(board);

  // cambiar el turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);

  // revisar si hay ganador
  const newWinner = checkWinner(newBoard);
  if (newWinner) {
    confetti();
    setWinner(newWinner);
  } else if (checkEndGame(newBoard)) {
    setWinner(false); // empate
  }
};