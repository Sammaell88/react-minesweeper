import React, { Component } from 'react';
import flagIcon from '../../icons/flag.svg';
import faceIcon from '../../icons/face.svg';
import smileIcon from '../../icons/smile.svg';
import deadIcon from '../../icons/dead.svg';
import './InfoPanel.css';

class InfoPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flags: 10,
      seconds: '00:00',
      gameover: false,
      gamewin: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.gameover || nextState.gamewin) {
      clearInterval(this.timer);
    }
  }

  render() {
    const face = this.state.gameover ? deadIcon : 
                 this.state.gamewin ? smileIcon : faceIcon;

    return (
      <div className="info-panel">
        <span className="info-block left">
          <img src={flagIcon} width="25" height="25" alt="flag" />: {this.state.flags}
        </span>
        <span className="info-block center">
          <img onClick={this.restartGame} className="face-icon" src={face} width="50" height="50" alt="face" />
        </span> 
        <span className="info-block">
          {this.state.seconds}
        </span> 
      </div> 
    );
  }

  startTimer() {
    let count = 60;
    this.timer = setInterval(() => {
      count++;
      let min = Math.floor((count / 60) % 60) - 1;
      min = min < 10 ? '0'+ min : min;
      let sec = count % 60;
      sec = sec < 10 ? '0'+ sec : sec;
      let time = `${min}:${sec}`;
      this.setState({seconds: time});
    }, 1000);
  }

  restartGame() {
    window.location.reload();
  }
}

export default InfoPanel;
