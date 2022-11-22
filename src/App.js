import './global.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateList } from './pages/CreateList';



function App() {
  return (


    <div className="App">


      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateList />} />

      </Routes>


    </div>
  );
}

export default App;
