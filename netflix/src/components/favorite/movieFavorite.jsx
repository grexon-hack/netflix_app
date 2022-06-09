
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { detailCard } from "../../redux/action";
import style from './favorite.module.css';

export default function FavoriteMovies() {
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerDetail = (val) => {
    dispatch(detailCard(val));

    history.push("/detail");
  };

  return (
    <div className={style.container}>
        <h1>Favorities Movies</h1>
      <div className={style.card}>
        {selector.Favorities.map((data, index) => {
          return (
            <div key={index} className={style.cardContent}>
              <div className={style.image}>
                <img
                  src={data.image}
                  alt={data.name}
                  onClick={() => handlerDetail(data.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
