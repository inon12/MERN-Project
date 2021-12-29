import './App.css';
import {BrowserRouter} from 'react-router-dom'
import StartPage from './Comp/startPage';
import Login from './Comp/loginPage';
import { useState } from 'react';
function App() {
  const [token,setToken]= useState();
  // localStorage.setItem("token",response.data.token);

  
  if(!token){
   return <Login setToken={setToken} />   
  }
  return ( 
    <div>
           <BrowserRouter>
            <StartPage setToken={setToken} />
            </BrowserRouter>
    </div>
  );
}
export default App;
