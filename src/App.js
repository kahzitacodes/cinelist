import './global.css';
import './forms.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import{HomeRead} from './pages/HomeRead'
import { CreateList } from './pages/CreateList';
import { Toaster } from 'react-hot-toast';
import { EditList } from './pages/EditList'

function App() {
  return (

    <div className="App">

      <Toaster />
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateList/>}/>
        <Route path='/home2' element={<HomeRead/>}/>
        <Route path='/edit' element={<EditList/>}/>
        
      </Routes>

    </div>
  );
}

export default App;
