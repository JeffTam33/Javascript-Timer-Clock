//Libaries used React, ReactDOM

class Length extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div class="length-wrapper">
        <span id={this.props.lengthNameId}>{this.props.lengthName}</span>
        <button id={this.props.lengthDecrementName} onClick={this.props.lengthIncrementMethod}>Up</button>
        <button id={this.props.lengthIncrementName} onClick={this.props.lengthDecrementMethod}>Down</button>
        <span id={this.props.lengthId}>{this.props.length}</span>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerDefault: 1500,
      stopTime: true
    };
    this.convertToTime = this.convertToTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
  }
  convertToTime(){
    let minute = Math.floor(this.state.timerDefault / 60);
    let second = this.state.timerDefault - minute * 60;
    second = second < 10 ? '0' + second : second;
    minute = minute < 10 ? '0' + minute : minute;
    return minute + ":" + second;
  }
  resetTime(){
    this.setState({
      timerDefault: 1500,
      breakLength: 5,
      sessionLength: 25,
      stopTime: true
    })
  }
  increaseBreak(){
    if(this.state.stopTime === true){
      this.setState({
        breakLength: this.state.breakLength + 1
      })
      console.log("Increase Break");
    }
  }
  decreaseBreak(){
    if(this.state.breakLength > 0 && this.state.stopTime === true){
      this.setState({
        breakLength: this.state.breakLength - 1
      })
      console.log("Decrease Break");
    }
  }
  increaseSession(){
    if(this.state.stopTime === true){
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timerDefault: this.state.timerDefault + 60
      })
      this.convertToTime();
      console.log("Increase Session"); 
    }
  }
  decreaseSession(){
    if(this.state.sessionLength > 0 && this.state.stopTime === true){
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timerDefault: this.state.timerDefault - 60
      })
      this.convertToTime();
      console.log("Decrease Session");
    }
  }
  stop(){
    this.setState({
      stopTime: true
    })
    console.log(this.state.stopTime);
  }
  play(){
    this.setState({
      stopTime: false,
    })
    this.updateTimer();
  }
  updateTimer(){
    console.log("I'm the update timer");
    this.setState({
      timerDefault: this.state.timerDefault - 1
    })
    this.convertToTime();
  }
  
  render(){
    return(
      <div id="clock-container">
        <div id="title-wrapper">
          <span>Clock Application</span>
        </div>
        <Length
          lengthName="Break Length"
          lengthNameId="break-label"
          length={this.state.breakLength}
          lengthId="break-length"
          lengthDecrementName="break-decrement"
          lengthIncrementName="break-increment"
          lengthDecrementMethod={this.decreaseBreak}
          lengthIncrementMethod={this.increaseBreak}
        />
       <Length
          lengthName="Session Length"
          lengthNameId="session-label"
          length={this.state.sessionLength}
          lengthId="session-length"
          lengthDecrementName="session-decrement"
          lengthIncrementName="session-increment"
          lengthDecrementMethod={this.decreaseSession}
          lengthIncrementMethod={this.increaseSession}
        />
      <div id="time-wrapper">
        <span id="timer-label">Time</span>
        <span id="time-left">{this.convertToTime()}</span>
        <button id="play" onClick={this.play}>Play</button>
        <button id="start_stop" onClick={this.stop}>Pause</button>
        <button id="reset" onClick={this.resetTime}>Reset</button>
      </div>
      </div>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));