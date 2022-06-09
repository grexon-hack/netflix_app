import Categories from "../login/categories";
import style from "../../stylesModules/login.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/action";
import { hash } from "./funtExtern";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [show, setShow] = useState(false);
  const [passwordHash, setPasswordHash] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory()

  const handlerSubmit =  (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    setPasswordHash(hash(name, email, password));

    if (password === e.target.password2.value) {
      setShow(true);
      dispatch(postUser({ID: hash(name, email, password), name, email, password : hash(password) }));  
    } else {
      alert("tus contraseñas no coinsiden");
      setPasswordHash(null)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1500);
  },[]);


  return (
    <div className={style.containerRegister}>
      <button onClick={() => history.goBack()} style={{position:'absolute', top:'20px', left: '20px'}}>Back</button>
      {loading?<>
      <div className={style.containerForm}>
        <h1>Register</h1>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            autoComplete="off"
           
          />
          <input
            type="text"
            name="email"
            required
            placeholder="Email"
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            autoComplete="off"
          />
          <input
            type="password"
            name="password2"
            required
            placeholder="Repit password"
            autoComplete="off"
          />
          
          <button>Submit</button>
        </form>
      </div>
      {show && <Categories props={passwordHash}/>}
      </>: <h1 style={{color:'azure'}}>LOADING...</h1>}
    </div>
  );
}
