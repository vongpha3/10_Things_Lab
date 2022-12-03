/* Citation: https://codepen.io/gaearon/pen/LyyXgK?editors=0010 */
/* Citation: https://reactjs.org/tutorial/tutorial.html */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// // Child (Board contains squares)
// class Square extends React.Component {

//     // Constructor: Creating the square with a value
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: null, // What value is in the square
//         };
//     }

//     render() {
//       return (
//         // Set the state of the square's value as X
//         <button className="square" onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

// Squares function
// When square is clicked, the contents (value) is modified
function Square(props) {

    return(
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );

}
  
  // Parent
  class Board extends React.Component {

    // Constructor: Creating the board with squares
    // constructor(props) {

    //     super(props);
    //     this.state = {

    //         squares: Array(9).fill(null), // The squares that represnt the board
    //         xIsNext: true, // Determines if X or O should be the square value

    //     };

    // }

    // When clicked, the square has an X
    // handleClick(i) {
        
    //     const history = this.state.history;
    //     const current = history[history.length - 1];
    //     // Create a copy of the array to not modify the original
    //     const squares = current.squares.slice();

    //     // Ignore a click if the square has a value or the game is won
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }

    //     // If true X, else O
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';

    //     this.setState({
    //         history: history.concat([{
    //             squares: squares, // Set the squares
    //         }]),
    //         xIsNext: !this.state.xIsNext, // Set the next player turn
    //     });
    // }

    // i: Associated square on the board
    renderSquare(i) {
        // Change the square render when clicked on
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }
  
    render() {
      // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
    //   const winner = calculateWinner(this.state.squares);
    //   let status; // String

    //   if (winner) {
    //     status = 'Winner: ' + winner;
    //   } else {
    //     status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    //   }

      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    // Constuctor: The game contains the board
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0, // Move to jump to
          xIsNext: true,
        };
    }

    handleClick(i) {
        
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // Create a copy of the array to not modify the original
        const squares = current.squares.slice();

        // Ignore a click if the square has a value or the game is won
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // If true X, else O
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares, // Set the squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext, // Set the next player turn
        });
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0
        });
    }

    render() {

      const history = this.state.history; // The history of moves
      const current = history[this.state.stepNumber]; // The current state of moves
      const winner = calculateWinner(current.squares);
      // History of moves player can jump to
      const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move : 
            'Go to move Game Start';

        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
      });

      let status; // String

      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares = {current.squares}
                onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  // Determines winner by comparing possible outcomes
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    // Extra 6: Display Draw message

    // Check if board is filled out
    for (let j = 0; j < squares.length; j++) {
        if (squares[j] === null){
            return null;
        }
    }

    // No winner but the board is filled? Draw.
    return('Draw');

    // Extra 6: Display Draw message

  }