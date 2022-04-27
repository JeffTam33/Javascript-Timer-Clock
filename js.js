//Libaries used React, ReactDOM

class Length extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      return(
        <div class="length-wrapper">
          <span id={this.props.lengthNameId}>{this.props.lengthName}</span>
          <button id={this.props.lengthDecrementName}>Up</button>
          <button id={this.props.lengthIncrementName}>Down</button>
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
        timerDefault: 3601
      };
      this.convertToTime = this.convertToTime.bind(this);
    }
    convertToTime(){
      console.log("I'm working");
      let minute = Math.floor(this.state.timerDefault / 60);
      let second = this.state.timerDefault - minute * 60;
      second = second < 10 ? '0' + second : second;
      minute = minute < 10 ? '0' + minute : minute;
      console.log(minute + ":" + second);
      return minute + ":" + second;
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
          />
         <Length
            lengthName="Session Length"
            lengthNameId="session-label"
            length={this.state.sessionLength}
            lengthId="session-length"
            lengthDecrementName="session-decrement"
            lengthIncrementName="session-increment"
          />
        <div id="time-wrapper">
          <span id="timer-label">Time</span>
          <span id="time-left">{this.convertToTime()}</span>
          <button id="start_stop">Pause</button>
          <button id="reset">Reset</button>
        </div>
        </div>
      )
    }
  }
  ReactDOM.render(<App/>, document.getElementById("root"));