import * as React from 'react';
import {BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import Login from './components/Login'
import Tracker from './components/Tracker'
import axios from 'axios'
import {connect} from 'react-redux'
import { Dispatch } from 'redux'
import {Page} from './class/Enums'

interface State {
  redirectTo?  :string;
  isLogged? : boolean;
  user : User;
}

interface Props {
  //Redux dispatcher
  addUserId (event: any): void;
}

class App extends React.Component<Props, State>{
  constructor(props: any){
    super(props);   
    this.state = {
      redirectTo : undefined,
      isLogged: undefined,
      user  : {
        userId : "",
        userEmal : "",
      }
    };
  }

  logUser = (p:any) =>{
    let url = "/api/Account/LoginFromClient/";
    let login = {Email : p.userLogin, Password : p.userPassword, RememberMe : p.rememberMe, Result:false, UserId:""}
    axios.post(url, login).then(res =>{
      if(res.data.result == true) {
        this.setState({
          isLogged : true,
          redirectTo : "/"
        })  

        let url = "/api/Account/GetUserId/" + p.userLogin;
        axios.get(url).then(res =>{
          this.setState({
            user : {
              userId : res.data.userId,
              userEmal : res.data.email,
            }
          })
          this.props.addUserId(res.data.userId);
        })
      }
      else{
        this.setState({
          isLogged : false,
          user : {
            userId : "",
            userEmal : ""
          }
        })
      }
    })
  }

  logoutUser = () =>{
    this.props.addUserId("");
    let url = "/api/Account/Logout/";
    axios.get(url).then(res =>{
        console.log("logout done!")
     })  

    this.setState({
      isLogged : undefined,
      user : {
        userId : "",
        userEmal : ""
      }
    })
    
  }

  redirectTo = (p : Page)=>{
    switch (p) {
      case Page.Login:
      this.setState({
        redirectTo : "/Login",
      })
        break;
      case Page.Logout:
        this.logoutUser();
        this.setState({
          redirectTo : "/Home",
        })
        break;
      default:
        break;
    }
  }

  public render() {
    return (
      <BrowserRouter>
      <div className="wrap">
      {this.state.redirectTo != undefined && <Redirect to={this.state.redirectTo} />}
        <NavMenu user={this.state.user} redirectTo={this.redirectTo} />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Home' component={Home} />
            <Route exact path='/Login' render={props => <Login {...props} logUser={this.logUser} isLogged={this.state.isLogged} />} />
            <Route exact path='/Tracker' render={props => <Tracker {...props} redirectTo={this.redirectTo} />} />
            
          </Switch>
        </div>
        <div id="push" className="push"></div>
        <Footer />
      </div>
      </BrowserRouter>
      
    );
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    //we add this function to our props
    addUserId: (userId:string) => {dispatch({type: 'SET_USER_ID', userId : userId})}
  }
}

export default connect(null ,mapDispatchToProps)(App);
