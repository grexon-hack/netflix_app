import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { detailCard, getContentUser, getUserById, postFavorite } from "../../redux/action";
import style from "../../stylesModules/home.module.css";


export default function HomePage() {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [stateFav, setStateFav ] = useState('');

  useEffect(() => {
    const usuario = localStorage.getItem("user");
    if (usuario) {
      let user = JSON.parse(usuario);
      if (!user.isAdmin) {
        dispatch(getContentUser({ ID: user.id }));
        dispatch(getUserById(user.id));
      }
    } else {
      history.push("/");
    }
  }, []);

  const handlerClick = () => {
    localStorage.clear();
    history.push("/");
  };

  const handlerDetail = (val) => {
    dispatch(detailCard(val));

    history.push("/detail");
  };

  const  handlerFavorities = (data) => {
    
    dispatch(postFavorite({UserId: selector.user.id ,id : data.id,name: data.name, image: data.image}))
    .then((data) => setStateFav(data))
   
  }
  useEffect(() => {
    setTimeout(() => {
      setStateFav('')
    }, 7000);
  },[stateFav])

  return (
    <div className={style.containerMovies}>
      <p 
      style={{position: 'fixed',color:'red', zIndex:'3', top:'0'}}
      ><strong>{stateFav}</strong></p>
      {selector ? (
        <>
          <div className={style.containerHeader}>
            <div className={style.picture}>
              <img src={selector.user.picture} alt="usuario" />
              <h3>{selector.user.name}</h3>
            </div>
            <div className={style.contentButtons}>
              <div onClick={handlerClick}>Log Out</div>
              <div onClick={() => history.push('/favorities')}>Favorities</div>
            </div>
          </div>
          <div className={style.containerMovies}>
            {selector.content.length ? (
              selector.content.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={style.cardContent}
                    
                  >
                    <div className={style.image}>
                    
                  
                      <img src={data.image} alt={data.name} 
                      onClick={() => handlerDetail(data.id)}
                      />
                    <button 
                      style={{position: 'relative', top: '-40px'}}
                      onClick={() => handlerFavorities(data)}
                      >
                        Favorite
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>LOADING...</h1>
            )}
          </div>
        </>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
}
