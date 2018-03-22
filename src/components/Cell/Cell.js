import React, { PureComponent } from 'react';
import flagIcon from '../../icons/flag.svg';
import mineIcon from '../../icons/mine.svg';
import './Cell.css';

class Cell extends PureComponent {
  constructor(props) {
    super(props);

    this.hasMine = props.hasMine;
    this.checkMinesAround = props.checkMinesAround;
    this.handleFlag = props.handleFlag;
    this.checkGameStatus = props.checkGameStatus;
    this.endGame = props.endGame;

    this.state = {
      isOpened: false,
      isBlown: false,
      hasFlag: false,
      minesAround: 0
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if(!this.hasMine &&  !this.state.isOpened && nextState.isOpened) {
      this.checkMinesAround(this.props.y,this.props.x);
      this.checkGameStatus();
    }
  }

  render() {
    const css = `Cell${this.state.isOpened ? ' opened':''}${this.state.isBlown ? ' blown':''}`,
          flag = this.state.hasFlag && <img src={flagIcon} width="25" height="25" alt="flag" />,
          minesAround = this.state.minesAround ? <span className={
            this.state.minesAround === 1 ? 'blue':
            this.state.minesAround === 2 ? 'green':
            this.state.minesAround >= 3 ? 'red':''
          }
          >{this.state.minesAround}</span> : "",
          mine = this.hasMine && this.state.isOpened && <img src={mineIcon} width="25" height="25" alt="mine" />;

    return (
      <div 
        className={css}
        onClick={this.handleLeftClick}
        onContextMenu={this.handleRightClick}>
        {mine}
        {flag}
        {minesAround}
      </div>
    );
  }

  handleLeftClick = () => {
    if (!this.state.hasFlag && !this.state.isOpened) {
      this.setState({
        isOpened: true,
        isBlown: this.hasMine
      });
      if(this.hasMine) this.endGame();           
    }
  }

  handleRightClick = (e) => {
    e.preventDefault();
    if (this.handleFlag(this.state.hasFlag) && !this.state.isOpened) 
    this.setState({hasFlag: !this.state.hasFlag});
  }
}


export default Cell;
