import * as React from 'react';
import {BrowserRouter, Route, Redirect  } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import Login from './components/Login'
import Tracker from './components/Tracker'
import axios from 'axios'

import {connect} from 'react-redux'
import { Dispatch } from 'redux'

interface State {
  isLogged? : boolean;
  user : User;
}

interface Props {
  addUserId (event: any): void;
}

class App extends React.Component<Props, State>{
  constructor(props: any){
    super(props);
    
    this.state = {
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
        })  

        let url = "/api/Account/GetUserId/" + p.userLogin;
        axios.get(url).then(res =>{
          console.log(res.data);
          this.setState({
            user : {
              userId : res.data.userId,
              userEmal : res.data.email,
            }
          })
          //mapDispatchToProps.addUserId(this.state.user.userId);
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

  public render() {
    console.log(this.props);
    return (
      <BrowserRouter>
      <div >
        <NavMenu user={this.state.user} />
        <div className="container" id="wrap">
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={props => <Login {...props} logUser={this.logUser} isLogged={this.state.isLogged} />} />
          <Route exact path='/tracker' component={Tracker} />
          {this.state.isLogged && <Redirect to='/' />}
        </div>
        <div id="push"></div>
       <Footer />
      </div>
      </BrowserRouter>
      
    );
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    //we want to call this function that will store userId in the store
    addUserId: (userId:string) => {dispatch({type: 'ADD_USER_ID', userId : userId})}
  }
}

export default connect(null ,mapDispatchToProps)(App);
//export default (App);
