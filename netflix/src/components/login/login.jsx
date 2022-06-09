import { useDispatch } from "react-redux";
import { getUser } from "../../redux/action.js";
import style from "../../stylesModules/login.module.css";
import image from "../../image/netflix.png";
import logoNetflix from "../../image/logoNetflix.png";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { hash } from "../register/funtExtern.js";

export default function Login() {
  const [error, setError] = useState(null);
  const [animation, setAnimation] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();


// verificacion, si el usuario ya esta logeado
  const usuario = localStorage.getItem("user");
  useEffect(() => {
    if (usuario) {
      let usuariotrue = JSON.parse(usuario);
      if (usuariotrue.isAdmin) return history.push("/admin");
      else {
        history.push("/home");
      }
    }
  }, []);
  //----------------------------------------------

  const handlerSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    dispatch(getUser(email.value, hash(password.value))).then((data) => {
      if (data.message) return setError(data.message);
      if (data.isAdmin) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            email: data.email,
            isAdmin: data.isAdmin,
          }),
        );
        return history.push("/admin");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            email: data.email,
            isAdmin: data.isAdmin,
          }),
        );

        history.push("/home");
      }
    });
    email.value = "";
    password.value = "";
  };

  return (
    <div className={style.containerLogin}>
      <div
        className={style.container}
        style={{ backdropFilter: animation && "blur(10px)" }}
      >
        <div
          className={style.login}
          style={{ transform: animation && "scale(1.1)", position: "absolute" }}
        >
          <div className={style.imageLogin}>
            <img src={logoNetflix} alt="logo-netflix" />
            <img
              src={image}
              alt="logo"
              style={{ filter: "drop-shadow(0 0 10px black)" }}
            />
          </div>
          <form onSubmit={(e) => handlerSubmit(e)}>
            <input
              type="text"
              name="email"
              autoComplete="off"
              required
              placeholder="Email"
              onFocus={() => setAnimation(true)}
              onBlur={() => setAnimation(false)}

            />
            <br />
            <input
              type="password"
              name="password"
              autoComplete="off"
              required
              placeholder="Password"
              onFocus={() => setAnimation(true)}
              onBlur={() => setAnimation(false)}

            />
            <br />
            <div className={style.containerButton}>
              <button 
              onFocus={() => setAnimation(true)}
              >Login</button>
            </div>
            {error && <p>{error}</p>}
          </form>
        </div>

        <button
          className={style.register}
          onClick={() => history.push("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
