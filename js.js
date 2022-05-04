//Libaries used React, ReactDOM, fontawsome icon picker 2.0
class Length extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div class="length-wrapper">
        <span id={this.props.lengthNameId}>{this.props.lengthName}</span>
        <div>
          <span id={this.props.lengthId}>{+this.props.length}</span>
        </div>
        <button id={this.props.lengthIncrementName} onClick={this.props.lengthMethod} value="add">+</button>
        <button id={this.props.lengthDecrementName} onClick={this.props.lengthMethod} value="sub">-</button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timerDefault: 1500,
      breakLength: 5,
      sessionLength: 25,
      stopTime: true,
      breakTime: false,
      timerType: "Session",
      intervalID: ""
    };
    this.breakManager = this.breakManager.bind(this);
    this.sessionManager = this.sessionManager.bind(this);
    this.lengthManager = this.lengthManager.bind(this);
    
    this.convertToTime = this.convertToTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.playTimer = this.playTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.setSessionTime = this.setSessionTime.bind(this);
    this.setBreakTime = this.setBreakTime.bind(this);
    this.playAlarm = this.playAlarm.bind(this);
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
      timerType: "Session",
      intervalID: ""
    })
    if(this.state.intervalID){
      clearInterval(this.state.intervalID);
    }
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }
  
  breakManager(e){
    if(this.state.stopTime && this.state.intervalID === ""){
      this.lengthManager(e.target.value, "break"); 
    }
  }
  
  sessionManager(e){
    if(this.state.stopTime && this.state.intervalID === ""){
      this.lengthManager(e.target.value, "session"); 
    }
  }
  
  lengthManager(action, name){
    if(name === "break"){
      if(action === "add" && this.state.breakLength < 60){
        this.setState({breakLength: this.state.breakLength + 1})
      }else if(action == "sub" && this.state.breakLength > 1){
        this.setState({breakLength: this.state.breakLength - 1})
      }
    }else if(name === "session"){
      if(action === "add" && this.state.sessionLength < 60){
        this.setState({sessionLength: this.state.sessionLength + 1, timerDefault: this.state.timerDefault + 60})
      }else if(action == "sub" && this.state.sessionLength > 1){
        this.setState({sessionLength: this.state.sessionLength - 1, timerDefault: this.state.timerDefault - 60})
      }
    }
    
  }
  playTimer(){
    if(this.state.stopTime){
      this.setState({
        stopTime: false,
        intervalID: setInterval(() => {
          this.updateTimer();
        }, 1000)
      })
    }else{
      this.setState({
        stopTime: true,
        intervalID: clearInterval(this.state.intervalID)
      })
    }
  }
  updateTimer(){
    if(this.state.timerDefault === 0 && !this.state.timeEnded){
      this.setState({
        timeEnded: true
      })
    }else if(this.state.timerDefault === 0 && this.state.timeEnded){
      if(this.state.timerDefault === 0 && !this.state.breakTime){
        this.setState({
          timerType: "Break"
        })
        this.playAlarm();
        this.setBreakTime();
      }else if(this.state.timerDefault === 0 && this.state.breakTime){
        this.setState({
          timerType: "Session"
        })        
        this.playAlarm();
        this.setSessionTime();
      }
    }else{
      this.setState({
        timerDefault: this.state.timerDefault - 1
      })
    }
  }
  setSessionTime(){
    this.setState({
      breakTime: false,
      timeEnded: false,
      timerDefault: this.state.sessionLength * 60
    })
  }
  setBreakTime(){
    this.setState({
      breakTime: true,
      timeEnded: false,
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
          lengthMethod={this.breakManager}
        />
       <Length
          lengthName="Session Length"
          lengthNameId="session-label"
          length={this.state.sessionLength}
          lengthId="session-length"
          lengthDecrementName="session-decrement"
          lengthIncrementName="session-increment"
          lengthMethod={this.sessionManager}
        />
        <div id="time-wrapper">
          <span id="timer-label">{this.state.timerType}</span>
          <div>
            <span id="time-left">{this.convertToTime()}</span>
          </div>
          <button id="start_stop" onClick={this.playTimer}><i className="fas fa-play"/></button>
          <button id="reset" onClick={this.resetTime}><i className="fas fa-redo-alt" /></button>
        </div>
        <audio
          id="beep"
          src="https://jeffreytambucket.s3.amazonaws.com/alarm-ring.wav"
          ref={(audio) =>{
            this.audioAlarm = audio;
          }}
        />
      </div>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));