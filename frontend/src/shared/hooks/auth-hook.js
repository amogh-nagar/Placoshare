import { useEffect, useCallback, useState } from 'react';

let logouttimer;
export const useAuth = () => {
  const [token, settoken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [remainingtime, setremainingtime] = useState(null);
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    if (
      userData !== null &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, userData.expiration);
    } else if (userData && new Date(userData.expiration) < new Date()) {
      logout();
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
    const tokenExpirationDate =
       new Date(new Date().getTime() + 1000 * 60 * 60);
    setremainingtime(expirationdate?new Date(expirationdate):tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: expirationdate?expirationdate:tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    settoken(null);
    setUserId(null);
    setremainingtime(null);
    localStorage.removeItem('userData');
  }, []);

  return { login, logout, token, userId };
};
