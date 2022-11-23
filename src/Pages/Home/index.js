import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import { HeaderFirst } from "../../components/HeaderFirst";
import {Footer} from '../../components/Footer';
import {list} from '../../data';
import style from "./style.module.css";

const filmes = [
  { name: "harry" },
  { name: "spider" },
  { name: "black" },
  { name: "it" },
];

export function Home(props) {
  return (


    
<div>

    <HeaderFirst  title="Compartilhe seus filmes e séries favoritos!"
      text="Acesse listas de recomendações e também compartilhe seus filmes e sériesfavotiros" />

     
      <div className={style.container}>

        {list.slice(0, 8).map((filme) => (
          <Card  nameList={filme.title} director={filme.autor} img={filme.image} id={filme._id}/>
        ))}
        
      </div>

     <Footer title='Crie listas com suas séries e filmes e compartilhe!' />

      
    </div>
  );
}

