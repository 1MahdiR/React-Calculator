import React from 'react';
import './App.css';

export class Btn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <button className="btn" href="#" onClick={(e) => this.props.updateTextInput(this.props.text, this.props.id)} >
        {this.props.text}
      </button>
    );
  }

}

export class BtnPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="btnPad">
        <table className="btnPadTable">
          <tbody>
            <tr>
              <td>
                <Btn id='1' text="AC" updateTextInput={this.props.updateTextInput} />
              </td>
              <td>
                <Btn id='2' text="+/-" updateTextInput={this.props.updateTextInput} />
              </td>
              <td>
                <Btn id='3' text="%" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-op">
                <Btn id='4' text="÷" updateTextInput={this.props.updateTextInput} />
              </td>
            </tr>
            <tr>
              <td className="btn-num">
                <Btn id='17' text="7" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-num">
                <Btn id='18' text="8" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-num">
                <Btn id='19' text="9" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-op">
                <Btn id='5' text="×" updateTextInput={this.props.updateTextInput} />
              </td>
            </tr>
            <tr>
              <td className="btn-num">
                <Btn id='14' text="4" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-num">
                <Btn id='15' text="5" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-num">
                <Btn id='16' text="6" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-op">
                <Btn id='6' text="-" updateTextInput={this.props.updateTextInput} />
              </td>
            </tr>
            <tr>
              <td className="btn-num">
                <Btn id='11' text="1" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-num">
                <Btn id='12' text="2" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-num">
                <Btn id='13' text="3" updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-op">
                <Btn id='7' text="+" updateTextInput={this.props.updateTextInput} />
              </td>
            </tr>
            <tr>
              <td className="btn-num" colSpan={2}>
                <Btn id='9' text="0" updateTextInput={this.props.updateTextInput} />
              </td>
              <td>
                <Btn id='10' text="." updateTextInput={this.props.updateTextInput} />
              </td>
              <td className="btn-op">
                <Btn id='8' text="=" updateTextInput={this.props.updateTextInput} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }  
}

export class ParentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  'text':'0',
                  'operand_1':0,
                  'operand_2':0,
                  'operator':'',
                  'is_on_ac':true,
                  'floating_point':false,
                  'is_negative':false,
                  'is_on_operand_1':true,
                  'is_on_operand_2':false,
                  'caught_error':false,
                };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  calculate(operand_1, operand_2, operator) {
    let answer;
    switch (operator) {
          case "+":
            answer = parseFloat((operand_1 + operand_2).toFixed(10));
            break;
          case "-":
            answer = parseFloat((operand_1 - operand_2).toFixed(10));
            break;
          case "×":
            answer = parseFloat((operand_1 * operand_2).toFixed(10));
            break;
          case "÷":
            if (operand_2 == 0) {
              this.state.caught_error = true;
              return 0;
            }
            answer = parseFloat((operand_1 / operand_2).toFixed(10));
            break;
    }
    return answer;
  } 

  updateTextInput(text, id) {
    let new_state = JSON.parse(JSON.stringify(this.state))
    
    if (new_state.caught_error) {
      new_state.operand_1 = 0;
      new_state.operand_2 = 0;
      new_state.operator = '';
      new_state.floating_point = false;
      new_state.is_negative = false;
      new_state.text = '0';
      new_state.is_on_operand_2 = false;
      new_state.is_on_operand_1 = true;
      new_state.is_on_ac = true;
      new_state.caught_error = false;
    }

    if (new_state.is_on_ac) {
      if (id =='1') {
        new_state.text = '0';
      }

      if (this.state.is_on_operand_1 && (id =='9' || id =='11' || id =='12' || id =='13' || id =='14' || id =='15' || id =='16' || id =='17' || id =='18' || id =='19')) {
        new_state.text = text;
        new_state.is_on_ac = false;
      } else if (this.state.is_on_operand_1 && id =='10' && !this.state.floating_point) {
        new_state.text = new_state.text + text;
        new_state.floating_point = true;
        new_state.is_on_ac = false;
      }
      
      if (this.state.is_on_operand_2 && (id =='9' || id =='11' || id =='12' || id =='13' || id =='14' || id =='15' || id =='16' || id =='17' || id =='18' || id =='19')) {
        new_state.text = text;
        new_state.is_on_ac = false;
      } else if (this.state.is_on_operand_2 && id =='10' && !this.state.floating_point) {
        new_state.text = new_state.text + text;
        new_state.floating_point = true;
        new_state.is_on_ac = false;
      }

    } else {
      if (this.state.is_on_operand_1 && (id =='9' || id =='11' || id =='12' || id =='13' || id =='14' || id =='15' || id =='16' || id =='17' || id =='18' || id =='19')) {
        new_state.text = new_state.text + text;
      } else if(this.state.is_on_operand_1 && id =='10' && !this.state.floating_point) {
        new_state.text = new_state.text + text;
        new_state.floating_point = true;

      } else if (this.state.is_on_operand_1 && (id =='4' || id =='5' || id =='6' || id =='7')) {
        new_state.operator = text;
        new_state.is_on_operand_2 = true;
        new_state.is_on_operand_1 = false;
        new_state.floating_point = false;
        new_state.is_negative = false;
        new_state.is_on_ac = true;
        new_state.operand_1 = parseFloat(new_state.text);
        new_state.text = '0';
      } else if (this.state.is_on_operand_1 && id =='2') {
        if (!this.state.is_negative) {
          new_state.text = '-' + new_state.text;
          new_state.is_negative = true;
        } else {
          new_state.text = new_state.text.slice(1, new_state.text.length);
          new_state.is_negative = false;
        }
      } else if (this.state.is_on_operand_1 && id =='3') {
        new_state.text = parseFloat(((parseFloat(new_state.text))/100).toFixed(10));
      }

      if (this.state.is_on_operand_2 && (id =='9' || id =='11' || id =='12' || id =='13' || id =='14' || id =='15' || id =='16' || id =='17' || id =='18' || id =='19')) {
        new_state.text = new_state.text + text;
      } else if(this.state.is_on_operand_2 && id =='10' && !this.state.floating_point) {
        new_state.text = new_state.text + text;
        new_state.floating_point = true;

      } else if (this.state.is_on_operand_2 && (id =='4' || id =='5' || id =='6' || id =='7')) {

        new_state.operand_2 = parseFloat(new_state.text);
        let answer;

        answer = this.calculate(new_state.operand_1, new_state.operand_2, new_state.operator);

        new_state.operand_1 = answer;
        new_state.operator = text;
        new_state.floating_point = false;
        new_state.is_negative = false;
        new_state.text = answer.toString();
        new_state.is_on_ac = true;

      } else if (this.state.is_on_operand_2 && (id == '8')) {

        new_state.operand_2 = parseFloat(new_state.text);
        let answer;

        answer = this.calculate(new_state.operand_1, new_state.operand_2, new_state.operator);

        new_state.operand_1 = 0;
        new_state.operand_2 = 0;
        new_state.operator = '';
        new_state.floating_point = false;
        new_state.is_negative = false;
        new_state.text = answer.toString();
        new_state.is_on_operand_2 = false;
        new_state.is_on_operand_1 = true;
        new_state.is_on_ac = true;

      } else if (this.state.is_on_operand_2 && id =='2') {
        if (!this.state.is_negative) {
          new_state.text = '-' + new_state.text;
          new_state.is_negative = true;
        } else {
          new_state.text = new_state.text.slice(1, new_state.text.length);
          new_state.is_negative = false;
        }

      } else if (this.state.is_on_operand_2 && id =='3') {
        
        new_state.text = parseFloat(((parseFloat(new_state.text))/100).toFixed(10));
      }

      if (id =='1') {
        new_state.operand_1 = 0;
        new_state.operand_2 = 0;
        new_state.operator = '';
        new_state.floating_point = false;
        new_state.is_negative = false;
        new_state.text = '0';
        new_state.is_on_operand_2 = false;
        new_state.is_on_operand_1 = true;
        new_state.is_on_ac = true;
        new_state.caught_error = false;
      }
    }

    if (this.state.caught_error) {
      new_state.text = "ERROR";
    }
    this.setState((state) => (new_state));
  }

  render() {
    return (
      <div className="container">
        <div className="showText">
          <div className="text-container">
            <div className="text">{this.state.text}</div>
            <div className="operator">{this.state.operator}</div>
          </div>
        </div>
        <BtnPad updateTextInput={this.updateTextInput} />
      </div>
    );
  }
}
