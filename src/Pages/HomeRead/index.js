import {Header} from '../../components/Header';
import {CardRead} from '../../components/CardRead'
import {list} from '../../data';
import style from "./style.module.css";

export function HomeRead (){

    return(


        <div>

          <Header/>


          
      <div className={style.container}>
                    
              {list.slice(0, 2).map((filme) => (
                <CardRead  nameList={filme.title} director={filme.autor} img={filme.image} id={filme._id}/>
              ))}

      </div>

        </div>
        
        
        )

}


