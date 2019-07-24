import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import "./App.css";

// run animation
const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex = 0;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const shuffleCount = 8;

const Item = posed.li({});

class App extends Component {
  state = {
    cups: [0, 1, 2],
    count: shuffleCount,
    cupWithBall: Math.floor(Math.random() * 3),
    interval: 0,
    isWin: false,
    isMessageVisible: false,
    islAlreadyPlayed: false
  };

  componentDidUpdate() {
    console.log(this.state.count);
    if (this.state.count === 0) {
      clearInterval(this.state.interval);
    }
  }

  startGame = e => {
    this.setState({
      cupWithBall: Math.floor(Math.random() * 3),
      isMessageVisible: false,
      islAlreadyPlayed: false,
      interval: setInterval(() => {
        this.setState({
          cups: shuffle(this.state.cups),
          count: this.state.count - 1
        });
      }, 1000)
    });
  };

  getResult = (id, e) => {
    if (this.state.islAlreadyPlayed === true) {
      alert("You are already played");

    }

    this.setState({
      isMessageVisible: true,
      islAlreadyPlayed: true,
      count: shuffleCount
    });

    this.state.cupWithBall === id
      ? this.setState({
          isWin: true
        })
      : this.setState({
          isWin: false
        });
    console.log(id, this.state.cupWithBall);
  };

  render() {
    const message =
      this.state.isMessageVisible === true ? (
        this.state.isWin === true ? (
          <h3>You win</h3>
        ) : (
          <h3>You lose</h3>
        )
      ) : null;

    return (
      <div>
        {message}
        <button onClick={e => this.startGame(e)}>Start Game</button>
        <ul>
          <PoseGroup>
            {this.state.cups.map(id => (
              <Item key={id} onClick={e => this.getResult(id, e)} />
            ))}
          </PoseGroup>
        </ul>
      </div>
    );
  }
}

export default App;
