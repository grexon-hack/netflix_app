import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import style from '../../stylesModules/home.module.css';


export default function Detail() {
  const selector = useSelector((state) => state.detail);
  const history = useHistory()

  return (
    <div className={style.containerDetail}>
      <button onClick={() => history.goBack()} 
      style={{position:'absolute', top:'20px', left: '20px'}}
      >Back</button>
      <div className={style.detailCard}>
        <div>
          <img src={selector[0].image} alt="image" />
        </div>
        <div className={style.info}>
          <h3>{selector[0].name}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ipsam
            eveniet cupiditate facere aliquid dolores nesciunt. Necessitatibus
            quaerat inventore quas cupiditate eaque est id laboriosam, minus
            odit veritatis, asperiores a!
          </p>
        </div>
      </div>
    </div>
  );
}
