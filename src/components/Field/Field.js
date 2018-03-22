import React, { Component } from 'react';
import Cell from '../Cell/Cell.js';
import InfoPanel from '../InfoPanel/InfoPanel.js';
import './Field.css';

class Field extends Component {
  constructor(props) {
    super(props);
    this.gameStarted = false;
    this.openedCells = 0;
    this.cellsWithMines = 0;
  }

  render() {
    const matrix = [];

    for (let i = 0; i < 10; i++) { 
      matrix[i] = [];
      for (let j = 0; j < 10; j++) {
        let random = Math.round(Math.random()*10);
        if(random < 2) this.cellsWithMines++;
        matrix[i][j] = <Cell key={`${i}-${j}`} 
                             ref={`${i}-${j}`}
                             y={i}
                             x={j}
                             hasMine={random < 2}
                             endGame={this.endGame.bind(this)} 
                             handleFlag={this.handleFlag.bind(this)}
                             checkGameStatus={this.checkGameStatus.bind(this)}
                             checkMinesAround={this.checkMinesAround.bind(this)}/>;
      }
    }

    return (
      <div className="Field">
        <InfoPanel ref='info'/>
        {matrix}
      </div>
    );
  }

  handleFlag(hasFlag) {
    let flags = this.refs['info'].state.flags;
    if(flags > 0 && !hasFlag) {
      flags--;
      this.refs['info'].setState({flags: flags})
      return true;
    }
    if(flags < 10 && hasFlag) {
      flags++;
      this.refs['info'].setState({flags: flags})
      return true;
    }
  }

  checkMinesAround(y,x) {
    if(!this.gameStarted) {
      this.gameStarted = true;
      this.refs['info'].startTimer();
    }

    let target = this.refs[`${y}-${x}`],
        roundCells = [
          this.refs[`${y}-${x-1}`],
          this.refs[`${y-1}-${x-1}`],
          this.refs[`${y-1}-${x}`],
          this.refs[`${y-1}-${x+1}`],
          this.refs[`${y}-${x+1}`],
          this.refs[`${y+1}-${x-1}`],
          this.refs[`${y+1}-${x}`],
          this.refs[`${y+1}-${x+1}`]
        ],
        mines = 0;

    roundCells.forEach((item) => {
      if(item && item.props.hasMine) mines++;
    })

    if(mines > 0) {
      target.setState({minesAround: mines});
      return;
    }

    if(mines === 0) {
      roundCells.forEach((item) => {
        if(item && !item.state.hasFlag && !item.state.isOpened) {
          item.setState({isOpened: true});
        }
      })
    }
  }

  checkGameStatus(state) {
    this.openedCells++;
    let unopenedCells = 100 - this.cellsWithMines - this.openedCells; 

    if(!unopenedCells) {
      this.winGame();
    }
  }

  endGame() {
    document.querySelector('.Field').classList.add('disabled');
    this.refs['info'].setState({gameover: true});
    for (let key in this.refs) {
      if(key !== 'info' && this.refs[key].props.hasMine)
        this.refs[key].setState({isOpened: true});
    }  
  }

  winGame() {
    document.querySelector('.Field').classList.add('disabled');
    this.refs['info'].setState({gamewin: true});
  }
}

export default Field;
