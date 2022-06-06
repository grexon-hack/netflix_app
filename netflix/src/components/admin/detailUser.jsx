import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from '../../stylesModules/admin.module.css';


export default function DetailUser() {

    const selector = useSelector(state => state.detail)
    const history = useHistory();
    console.log(selector)
    return (
        <div className={style.containerDetailUser}>
            <button onClick={() => history.goBack()}>Back</button>
            <div className={style.infoUser}>
                <img src={selector[0].picture} alt="picture" />
                <div>
                    <h1>{selector[0].name}</h1>
                    <h3>Email: {selector[0].email}</h3>
                    <h4>CreatedAt: {selector[0].createdAt}</h4>
                    <div className={style.numPeli}>
                        <h4>Number of movies</h4>
                        <h2>{selector[0].Contents.length}</h2>
                    </div>
                </div>
            </div>
            <div className={style.DetailContent}>
               <h2>History</h2>
               {
                   selector[0].Contents.map((data, index) => {
                       return(
                           <div key={index} className={style.detailpeli}>
                               <span>{index + 1}</span>
                               <span><strong>Name Movie:</strong>{data.name}</span>
                               <span><strong>URL:</strong>{data.image}</span>
                           </div>
                       )
                   })
               }
            </div>
        </div>
    )
}