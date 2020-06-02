import React,{Component} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Auth extends Component {

  state={
    controls:{
      email: {
          elementType: 'input',
          elementConfig: {
              type: 'email',
              placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
              required: true,
              isEmail: true
          },
          valid: false,
          touched: false
      },
      password: {
          elementType: 'input',
          elementConfig: {
              type: 'password',
              placeholder: 'Password'
          },
          value: '',
          validation: {
              required: true,
              minLength:6
          },
          valid: false,
          touched: false
      }
    },
    isSign:true
  }

  componentWillMount() {
    if(!this.props.buildingburger && this.props.authredirectpath!=='/')
    {
      this.props.onsetredirectpath();
    }
  }


  checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
          return true;
      }

      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

      return isValid;
  }

  submitHandler=(event)=>{
    event.preventDefault();
    this.props.onInit(this.state.controls.email.value,this.state.controls.password.value,this.state.isSign);
  }

  inputChangedHandler=(event,controlName)=>{
    const updatedControl = {
        ...this.state.controls,
        [controlName]:{
          ...this.state.controls[controlName],
          value:event.target.value,
          valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
          touched:true
        }
    };

    this.setState({controls:updatedControl});
  }

  switchsign=()=>{
    this.setState(prevState=>{
      return {isSign:!prevState.isSign}
    })
  }

  render(){

    let signarray=[];
    for(let key in this.state.controls)
    {
      signarray.push({
        id:key,
        config:this.state.controls[key]
      })
    }

    const signform = signarray.map(formElement=>(
      <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ))

    let authredirect=null;
    if(this.props.isAuthenticated) {
     authredirect=<Redirect to={this.props.authredirectpath}/>
    //authredirect=<Redirect to="/"/>
    }

    return (
      <div className={classes.Auth}>
        {authredirect}
        <form onSubmit={this.submitHandler}>
          {signform}
          <Button btnType="Success">Submit</Button>
        </form>
          <Button btnType="Danger" clicked={this.switchsign}>{this.state.isSign ? "SIGNIN" : "SIGNOUT"}</Button>
      </div>
    )
  }
}

const mapStateToProps =state=>{
  return {
    isAuthenticated:state.auth.token!==null,
    buildingburger:state.reducer.building,
    authredirectpath:state.auth.authRedirectpath
  }
}

const mapStateToDispatch=dispatch=>{
  return {
     onInit:(email,password,isSign)=>dispatch(actions.auth(email,password,isSign)),
     onsetredirectpath:()=>dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps,mapStateToDispatch)(Auth);
