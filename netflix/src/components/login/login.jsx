import { useDispatch} from "react-redux";
import { getUser } from "../../redux/action.js";
import style from "../../stylesModules/login.module.css";
import image from "../../image/netflix.png";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { hash } from "../register/funtExtern.js";


export default function Login() {

  const [error, setError] = useState(null);
  const [animation, setAnimation] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  

  const usuario = localStorage.getItem('user')
  useEffect(() => {
    if (usuario) {
      let usuariotrue = JSON.parse(usuario)
      if(usuariotrue.isAdmin) return history.push('/admin');
      history.push('/home')
      
    }
  },[]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email;
    let password = e.target.password;
    dispatch(getUser(email.value,hash(password.value)))
    .then(data => {
      if(data.message) return setError(data.message);
      if(data.isAdmin) {

        localStorage.setItem('user', JSON.stringify({id: data.id, isAdmin: data.isAdmin}));
        return history.push('/admin')
      } else {
        localStorage.setItem('user', JSON.stringify({id: data.id, isAdmin: data.isAdmin}));

        history.push('/home')
      }
    })
    email.value = '';
    password.value= "";
  }

  return (
    <div className={style.containerLogin}>
      <div className={style.container}
      style={{backdropFilter:animation&&'blur(10px)'}}
      >
        <div className={style.login} onClick={() => setAnimation(true)} 
        style={{transform:animation&&'scale(1.1)', position:'absolute'}}
        >
          <div className={style.imageLogin}>
            <img src={image} alt="logo"  style={{filter: 'drop-shadow(0 0 10px black)'}}/>
          </div>
          <form onSubmit={(e) => handlerSubmit(e)}>
            <input type="text" name="email" autoComplete="off" required placeholder="Email"/>
            <br />
            <input type="password" name="password" autoComplete="off" required placeholder="Password"/>
            <br />
            <div className={style.containerButton}>
            <button>Login</button>
            </div>
          {
            error&&<p>{error}</p>
          }
          </form>
        </div>

        <button className={style.register} onClick={() => history.push('/register')}>Register</button>
        
      </div>
    </div>
  );
}
