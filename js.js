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
      stopTime: true,
      intervalID: ""
    };
    this.convertToTime = this.convertToTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.stop = this.stop.bind(this);
    this.playTimer = this.playTimer.bind(this);
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
      stopTime: true,
      breakTime: false,
      intervalID: clearInterval(this.state.intervalID)
    })
  }
  increaseBreak(){
    if(this.state.stopTime === true && this.state.breakLength < 60){
      this.setState({
        breakLength: this.state.breakLength + 1
      })
    }
  }
  decreaseBreak(){
    if(this.state.breakLength > 1 && this.state.stopTime === true){
      this.setState({
        breakLength: this.state.breakLength - 1
      })
    }
  }
  increaseSession(){
    if(this.state.stopTime === true && this.state.sessionLength < 60){
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timerDefault: this.state.timerDefault + 60
      })
      this.convertToTime();
    }
  }
  decreaseSession(){
    if(this.state.sessionLength > 1 && this.state.stopTime === true){
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timerDefault: this.state.timerDefault - 60
      })
      this.convertToTime();
    }
  }
  stop(){
    this.setState({
      stopTime: true,
      intervalID: clearInterval(this.state.intervalID)
    })
  }
  playTimer(){
    this.setState({
      stopTime: false,
      intervalID: setInterval(() => {
        this.updateTimer();
      }, 1000)
    })
  }
  updateTimer(){
    if(this.state.timerDefault === 0 && !this.state.breakTime){
      document.getElementById("timer-label").textContent="Break";
      this.playAlarm();
      this.setBreakTime();
      this.stop();
    }else if(this.state.timerDefault === 0 && this.state.breakTime){
      document.getElementById("timer-label").textContent="Session";
      this.playAlarm();
      this.setSessionTime();
      this.stop();
    }
    this.setState({
      timerDefault: this.state.timerDefault - 1
    })
  }
  setSessionTime(){
    this.setState({
      breakTime: false,
      timerDefault: this.state.sessionLength * 60
    })
  }
  setBreakTime(){
    this.setState({
      breakTime: true,
      timerDefault: this.state.breakLength * 60
    })
  }
  playAlarm(){
    document.getElementById('beep').play();
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
          <span id="timer-label">Session</span>
          <span id="time-left">{this.convertToTime()}</span>
          <button id="play" onClick={this.playTimer}>Play</button>
          <button id="start_stop" onClick={this.stop}>Pause</button>
          <button id="reset" onClick={this.resetTime}>Reset</button>
        </div>
        <audio
          id="beep"
          src="https://jeffreytambucket.s3.amazonaws.com/alarm-ring.wav"
        />
      </div>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));