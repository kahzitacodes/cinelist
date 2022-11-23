import './global.css';
import './forms.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateList } from './pages/CreateList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (

    <div className="App">
      <Toaster />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateList />} />

      </Routes>

    </div>
  );
}

export default App;
