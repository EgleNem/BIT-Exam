import './bootstrap.css';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';
import { login, logout, authConfig } from './Functions/auth';
import axios from 'axios';
import { useState, useEffect } from "react";


function App() {

    return (
        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<RequireAuth role="user"><Front/></RequireAuth>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/admin" element={<RequireAuth role="admin"><Back show="admin" /></RequireAuth>} />
            <Route path="/admin/categories" element={<RequireAuth role="admin"><Back show="categories"/></RequireAuth>} />
            <Route path="/admin/books" element={<RequireAuth role="admin"><Back show="books"/></RequireAuth>} />
            
            
        </Routes>
            
        </BrowserRouter>
    )
}
function RequireAuth({ children, role }) {
    const [view, setView] = useState(<h2>Please wait...</h2>);
    console.log('React authConfig App')
    useEffect(() => {
      axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
        .then(res => {
          if ('ok' === res.data.msg) {
            setView(children);
          } else {
            setView(<Navigate to="/login" replace />);
          }
        })
  
    }, [children, role]);
  
    return view;
  }

  
  
  function LoginPage() {
    const navigate = useNavigate();
  
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
  
    const doLogin = () => {
      console.log('React doLogin App')
      axios.post('http://localhost:3003/login', { user, pass })
        .then(res => {
          console.log(res.data);
          if ('ok' === res.data.msg) {
            login(res.data.key);
            
              navigate('/', { replace: true });
           
          
          }
        })
    }
    return (
      <div className='login'>
        <div className='login-input'>Name: <input type="text" value={user} onChange={e => setUser(e.target.value)}></input></div>
        <div className='login-input'>Password: <input type="password" value={pass} onChange={e => setPass(e.target.value)}></input></div>
        <button onClick={doLogin}>Login</button>
      </div>
    );
  }
  
  function LogoutPage() {
    useEffect(() => logout(), []);
    return (
      <Navigate to="/login" replace />
    )
  }

export default App;