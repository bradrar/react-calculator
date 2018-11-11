import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Calculator />
      </div>
    );
  }
}

class Calculator extends Component {
  constructor(props){
    super(props) ;
      this.state = {
          prevValue: null,
          display: "0",
          operand: null,
          waitingForOperand: false
      }   

      this.handleClear = this.handleClear.bind(this);
      this.inputDigit = this.inputDigit.bind(this);
      this.inputDecimal = this.inputDecimal.bind(this);
      this.inputOperation = this.inputOperation.bind(this);
      this.calculate = this.calculate.bind(this);
      this.inputPlusMinus = this.inputPlusMinus.bind(this);
  }

  handleClear() {
    this.setState({
      prevValue: null,
      display: "0",
      operand: null,
      waitingForOperand: false
    })
  }

  inputDigit(digit) {
    let display = this.state.display

    if (this.state.waitingForOperand) {
      this.setState ({
        display: String(digit),
        waitingForOperand: false,
      })
    } else {
      this.setState({
        display: display === "0" ? String(digit) : display + digit 
      })
    }
    }
    
    

  inputDecimal(){

    if ( this.state.display.indexOf('.') === -1 )
    this.setState({
      display: this.state.display + "."
    })
  }

  inputOperation(operand) {
    this.setState({
      prevValue: this.state.display,
      waitingForOperand: true,
      operand: operand
    })
  }

  calculate() {

    let result = {
      "+": (prevValue, display) => prevValue + display , 
      "-": (prevValue, display) => prevValue - display,
      "*": (prevValue, display) => prevValue * display,
      "/": (prevValue, display) => prevValue / display ,
    }

    let operand = this.state.operand;
    let prevValue = parseFloat(this.state.prevValue);
    let display = parseFloat(this.state.display);

    if (this.state.operand === null){
      this.setState({
        display: "0"
      })
    } else {
      this.setState({
        display: String(result[operand](prevValue, display)),
        prevValue: null,
        operand: null,
        waitingForOperand: false
      })
  
    }
  }

  inputPlusMinus() {
    let display = this.state.display
    if (display.charAt(0) !== "-") {
      this.setState({
        display: "-" + String(this.state.display)
      }) 
    } else {
      this.setState({
        display: String(this.state.display.slice(1))
      }) 
    }
     
    
  }

  render() {
    return (
      <div >

      <Header />

      <div className="flex-container">
        <div className="flex-children">
          <Display 
          display={this.state.display}
          />
          <Buttons 
            handleClear={this.handleClear}
            inputDigit={this.inputDigit}
            inputDecimal={this.inputDecimal}
            inputOperation={this.inputOperation}
            calculate={this.calculate}
            inputPlusMinus={this.inputPlusMinus}
          />
        </div>
      </div>
      </div>
    )
  }
}

const Header = () => {
  return (
    <div className="header">
      <h1> React Calculator</h1>
    </div>
  )
}

const Display = (props) => {
  return (
    <div>
    <p className="display">{props.display}</p>
    </div>
  )
}

const Buttons = (props) => {
  return (
    <div>
      
      <button id="seven" onClick={() => props.inputDigit(7)}>7</button>
      <button id="eight" onClick={() =>  props.inputDigit(8)} >8 </button>
      <button id="nine" onClick={() =>  props.inputDigit(9)} > 9 </button>
      <button id="divide" onClick={() => props.inputOperation("/")}> / </button>
    
      <button id="four" onClick={() => props.inputDigit(4)} >4</button>
      <button id="five" onClick={() => props.inputDigit(5)} >5</button>
      <button id="6" onClick={() => props.inputDigit(6)} >6</button>
      <button id="multiply" onClick={() => props.inputOperation("*")}> * </button>
    
      <button id="one" onClick={() => props.inputDigit(1)}>1</button>
      <button id="two" onClick={() => props.inputDigit(2)}>2</button>
      <button id="three" onClick={() => props.inputDigit(3)}>3</button>
      <button id="subtract" onClick={() => props.inputOperation("-")}> -</button>
    
      <button id="decimal" onClick={() => props.inputDecimal('.')}>.</button>
      <button id="zero" onClick={() => props.inputDigit(0)}> 0</button>
      <button id="add" onClick={() => props.inputOperation("+")}> +</button>
      <button id="equals" onClick={props.calculate}> = </button>
      
      <button onClick={props.handleClear}  id="clear"> CLEAR </button>
      <button id="plus-minus" onClick={props.inputPlusMinus}> ±</button>
    </div>
  )
}


export default App;
