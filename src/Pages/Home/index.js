import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import { HeaderFirst } from "../../components/HeaderFirst";
import {Footer} from '../../components/Footer';
import {list} from '../../data';
import style from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home(props) {

const [filmes, setFilmes]= useState([])

  useEffect(()=>{

async function fetchFilmes(){

  try {
    
    const response= await axios.get('URL')
    console.log(response);

    setFilmes([...response.data])

  } catch (error) {
    
  }
}

  },[])


  return (


    
<div>

    <HeaderFirst  title="Compartilhe seus filmes e séries favoritos!"
      text="Acesse listas de recomendações e também compartilhe seus filmes e sériesfavotiros" />

     
      <div className={style.container}>


{/* 
        filmes.map() */}

        {list.slice(0, 8).map((filme) => (
          <Card  nameList={filme.title} director={filme.autor} img={filme.image} id={filme._id}/>
        ))}
        
      </div>

     <Footer title='Crie listas com suas séries e filmes e compartilhe!' />

      
    </div>
  );
}

