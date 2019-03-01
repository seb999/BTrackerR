import * as React from 'react';
import {BrowserRouter, Route, Redirect } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import NavMenu from './components/NavMenu'
import Login from './components/Login'
import axios from 'axios'
import {connect} from 'react-redux'
import { Dispatch } from 'redux'

interface State {
  isLogged? : boolean;
}

interface Props {
  addUserId (event: any): void;
}

class App extends React.Component<Props, State>{
  constructor(props: any){
    super(props);

    this.state = {
      isLogged: undefined
    };

    console.log(this.props);
  }

  logUser = (p:any) =>{
    let url = "/api/Account/LoginFromClient/";
    let login = {Email : p.userLogin, Password : p.userPassword, RememberMe : p.rememberMe, Result:false, UserId:""}
    axios.post(url, login).then(res =>{
      console.log(res.data);
      if(res.data.result == true) {
        this.setState({
          isLogged : true,
        })

        let url = "/api/Account/GetUserId/" + p.userLogin;
        axios.get(url).then(res =>{
          console.log(res.data.userId);
          this.props.addUserId(res.data.userId);
        })
      }
      else{
        this.setState({
          isLogged : false,
        })
      }
    })
  }

  public render() {
    return (
      <BrowserRouter>
      <div>
        <NavMenu />
        <div className="container">
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={props => <Login {...props} logUser={this.logUser} isLogged={this.state.isLogged} />} />
          {this.state.isLogged && <Redirect to='/' />}
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    addUserId: (userId:string) => {dispatch({type: 'ADD_USER_ID', userId : userId})}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {dispatch(toggleTodo(id))}
  }
}

export default connect(mapDispatchToProps)(App);
