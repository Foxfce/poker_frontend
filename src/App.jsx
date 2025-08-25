import { Flip, ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'
import { useUserStore } from './stores/userStore';
import { useEffect } from 'react';
import isTokenExpired from './utils/tokenUtils';

function App() {
  const token = useUserStore(state => state.token);
  const logout = useUserStore(state => state.logout);

  useEffect(() => {
    if (isTokenExpired(token)) {
      console.log('Token is expired');
      logout();
    }
  }, []);
  
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        rtl={false}
        theme="dark"
        transition={Flip}
        style={{
          zIndex: 9999,
        }}
      />
      <AppRouter />
    </>
  )
}

export default App
