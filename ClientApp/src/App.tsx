import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import NavMenu from './components/NavMenu';
import { NavCommand } from './components/NavMenu';
import Footer from './components/Footer';
import Login from './components/Login'
import Tracker from './components/Tracker'
import axios from 'axios'
import { connect } from 'react-redux'
import './actions/actions'
import { Dispatch } from 'redux'
// import { LOG_USER} from './actions/types';
import * as actionCreator from './actions/actions'
// import {Page} from './class/Enums'

interface State {
  redirectTo?: string;
  isLogged?: boolean;
  user: User;
  navCommands: Array<NavCommand>;

}

interface Props {
  //Redux dispatcher
  addUserId(event: any): void;
  logUser(event: any): void;
  history?: any;
  isLogged: boolean;
  userId: string;
}

class App extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);

    this.state = {
      navCommands: [
        { type: "NavLink", path: "/", text: "Home", isActive: false },
        { type: "NavLink", path: "/Tracker", text: "Tracker", isActive: false },
        { type: "NavLink", path: "/Map", text: "Map", isActive: false },
        { type: "Button", path: "", text: "Login", isActive: true },
        { type: "Button", path: "", text: "Logout", isActive: false, onExecute: this.logoutUser },
      ],
      redirectTo: undefined,
      isLogged: undefined,
      // user: {
      //   userId: "",
      //   userEmail: "",
      // }
    };
  }

  logUser = (p: User) => {
    //from reducer
    this.props.logUser(p);

    // if (this.props.userId != "") {
    //   this.setState({
    //     isLogged: true
    //   })
    // }
    // else {
    //   this.setState({
    //     isLogged: false
    //   });
    // }

    console.log(this.props.userId);

  }

logoutUser = () => {
  this.props.addUserId("");
  let url = "/api/Account/Logout/";
  axios.get(url).then(res => {
    console.log("logout done!")
  })

  // this.setState({
  //   isLogged: undefined,
  //   user: {
  //     userId: "",
  //     userEmail: ""
  //   }
  // })

}

redirectTo = () => {
  console.log(this.props);
}

  public render() {

  return (

    <BrowserRouter>

      <div>
      {this.props.userId}
        {this.state.redirectTo != undefined && <Redirect to={this.state.redirectTo} />}
        <NavMenu commands={this.state.navCommands} user={this.state.user} />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Home' component={Home} />
            <Route exact path='/Login' render={props => <Login {...props} logUser={this.logUser} isLogged={this.state.isLogged} />} />
            <Route exact path='/Tracker' render={props => <Tracker {...props} redirectTo={this.redirectTo} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>

  );
}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    //we add this function to our props
    addUserId: (userId: string) => { dispatch({ type: 'SET_USER_ID', userId: userId }) },
    // logUser : (user:User) => {dispatch({type: LOG_USER, user : user})}
    //logUser: (user: any) => dispatch(actionCreator.logUser(user)),

    logUser: (user: any) => dispatch(actionCreator.logUserAsyn(user))
  }
}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
  return {
    isLogged: state.isLogged,
    userId: state.userId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
