import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postCategories } from "../../redux/action";
import style from "../../stylesModules/login.module.css";


let arrayCategories = ['Action', 'Comedy','Biopic', 'Drama', 'Romance', 'Fantasy', 'Thriller', 'War', 'Horror', 'Silent', 'Science', 'Western'];

export default function Categories(props) {

    const [arrayCategory, setArrayCategory] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory();

    const handlerClick = () => {
        
        dispatch(postCategories({categoria: arrayCategory, ID: props}))
         history.push('/')
            
    }

    return (
        <div className= {style.categories}>
            <h2>Mark the categories of your preference</h2>
            <div className={style.containerCategories}>

            {
                arrayCategories.map((data, i) => {
                    return (
                        <div key={i} style={{width: '150px'}}>
                            <label htmlFor={data}>{data}</label>
                            <input type="radio" name={data} id={data} onChange={(e) => setArrayCategory([...arrayCategory,e.target.name ])}/>
                        </div>
                    )
                })
            }
            </div>
            <button onClick={handlerClick}>Send</button>
        </div>
    )
}