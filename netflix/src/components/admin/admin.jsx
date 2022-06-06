import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { adminUsers, deleteUser, detailCard, postCreateMovie } from "../../redux/action";
import style from '../../stylesModules/admin.module.css';


let arrayCategories = ['Action', 'Comedy','Biopic', 'Drama', 'Romance', 'Fantasy', 'Thriller', 'War', 'Horror', 'Silent', 'Science', 'Western'];

export default function Admin() {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const history = useHistory();
    const [createMovie, setCreateMovie] = useState(false);
    const [userId, setUserId] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(adminUsers())
    },[]);

    useEffect(() => {
        if(!createMovie) setCategories([])
    },[createMovie])

    const handlerClick = (value) => {
        dispatch(detailCard(value))
        history.push('/detailUser')
    }
    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(postCreateMovie({UserId: userId, id: userId.length, name: e.target.name.value, image: e.target.image.value, nameCategory: categories}))
        setCreateMovie(false)
    }
    
    return (
        <div className={style.containerAdmin}>
            <div className={style.headerAdmin}>
                <button 
                style={{position:'absolute', top:'20px', left:'20px'}}
                onClick={() =>{
                    localStorage.clear()
                    history.push('/')
                } }
                >Log out</button>
                <br />
                <img src={selector.user.picture} alt="ImageAdmin" />
                <div>

                <h2>Admin</h2>
                <h3>{selector.user.name}</h3>
                <h4>{selector.user.email}</h4>
                </div>
                <button onClick={() => setCreateMovie(!createMovie)}>
                   {!createMovie?'Create Movie':'Cancelar'} 
                </button>
                <br />
                {createMovie&&<div>
                    <form onSubmit={(e) => handlerSubmit(e)}>

                    <input type="text" name="name" placeholder="Name Movie"/>
                    <br />
                    <input type="text" name="image" placeholder="url Image"/>
                    <br />
                    <div className={style.contentRadius}>

                    {
                        arrayCategories.map((data, index) => {
                            return (
                                <div key={index} style={{width: '100px'}}>
                                    <label htmlFor={data}>{data}</label>
                                    <input type="radio" name={data} id={data} onChange={(e) => setCategories([...categories, e.target.name])}/>
                                </div>
                            )
                        })
                    }
                    </div>
                    <button>Create</button>
                    </form>
                </div>}
            </div>
            <div className={style.adminUsers}>
                {
                    selector.content.map((data, index) => {
                        return (

                        <div key={index} className={style.dataUser}>
                            {createMovie&&<input type="radio" name='usuario' id="usuario" value={data.id} onChange={(e) => setUserId(e.target.value)}/>}
                            <img src={data.picture} alt="pictureUser" style={{width: '80px'}}/>
                            <h3>{data.name}</h3>
                            <p>{data.email}</p>
                            <button onClick={() => handlerClick(data.id)}>Detail</button>
                            <button onClick={() => dispatch(deleteUser(data.id))}>Eliminar</button>
                            
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}