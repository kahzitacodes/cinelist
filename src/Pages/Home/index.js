import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import { HeaderFirst } from "../../components/HeaderFirst";
import {Footer} from '../../components/Footer';
import itImg from '../../images/it.jpg';
import capa from '../../images/imgTop.png';
import capa1 from'../../images/imgTop1.png';

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


      <Card nameList='Nome da recomendação' director=' Diretor:' img={itImg}/>


      <Footer/>
   
      {filmes.map((filme) => (
        <p>{filme.name}</p>
      ))}

      
    </div>
  );
}

