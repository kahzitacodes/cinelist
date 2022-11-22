import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import style from "./style.module.css";

export function CreateList() {


   return (
      <>
         <Header headerType="default" headerTitle="Crie sua própria lista de recomendações" />
         <section>
            <div className={style.container}>
               <form>
                  <h2> Informações da lista </h2>
                  <div className="form-control">
                     <label htmlFor="input-nome">Seu nome</label>
                     <input
                        id="input-name"
                        type="text"
                        name="name"
                     />
                  </div>

                  <SearchBar />

               </form>

            </div>
         </section>
      </>
   );
}