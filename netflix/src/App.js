import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/login/login.jsx';
import HomePage from './components/home/home';
import Admin from './components/admin/admin';
import Register from './components/register/register';
import Detail from './components/detail/detail';
import DetailUser from './components/admin/detailUser';

function App() {

  return (
    <React.Fragment>
      <Route exact path={'/'} component={Login}/>
      <Route exact path={'/home'} component={HomePage}/>
      <Route exact path={'/admin'} component={Admin}/>
      <Route path={'/register'} component={Register}/>
      <Route path={'/detail'} component={Detail}/>
      <Route path={'/detailuser'} component={DetailUser}/>
    </React.Fragment>
   
  );
}

export default App;
