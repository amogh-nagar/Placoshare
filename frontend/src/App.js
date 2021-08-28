import React, { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
let logouttimer;
const App = () => {
  const [token, settoken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [remainingtime, setremainingtime] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, userData.expiration);
    }else{
      logout()
    }
  }, []);

  useEffect(() => {
    if (token && remainingtime) {
      const remaining = remainingtime.getTime() - new Date().getTime();
      logouttimer = setTimeout(logout, remaining);
    } else {
      clearTimeout(logouttimer);
    }
  }, [token, remainingtime]);

  const login = useCallback((uid, token, expirationdate) => {
    settoken(token);
    setUserId(uid);
    const tokenexpiration =
      expirationdate || new Date(new Date.getTime() + 1000 * 60 * 60);
    setremainingtime(tokenexpiration);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenexpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    settoken(null);
    setUserId(null);
    setremainingtime(null)
    localStorage.removeItem('userData');
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        <Route path='/places/:placeId'>
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
