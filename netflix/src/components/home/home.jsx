import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { detailCard, getContentUser } from "../../redux/action";
import style from '../../stylesModules/home.module.css';


export default function HomePage() {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();


    
    useEffect(() => {
        const usuario = localStorage.getItem('user');
        let user = JSON.parse(usuario)
        dispatch(getContentUser({ID: user.id}))
    },[])

    const handlerClick = () => {
        localStorage.clear();
        history.push('/')
    }

    const handlerDetail = (val) => {
        dispatch(detailCard(val))
        
        history.push('/detail')
        
    }

    return (
        <div className={style.containerMovies}>
            <div className={style.containerHeader}>
                <div className={style.picture}>
                    <img src={selector&&selector.user.picture} alt="usuario" />
                    <h3>{selector&&selector.user.name}</h3>
                </div>
                <div className={style.contentButtons}>
                    <div onClick={handlerClick}>Log Out</div>
                </div>
            </div>
            <div className={style.containerMovies}>
                {
                    selector.content.length?selector.content.map((data, index) => {
                        return (
                            <div key={index} className={style.cardContent} 
                            onClick={()=>handlerDetail(data.id)}
                            >
                                <div className={style.image}>
                                    <img src={data.image} alt={data.name}/>
                                </div>
                                
                            </div>
                        )
                    }):<h1>LOADING...</h1>
                }
            </div>
        </div>
    )
}