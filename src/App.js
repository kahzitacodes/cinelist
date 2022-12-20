import "./global.css";
import "./forms.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ListDetails } from "./pages/ListDetails";
import { CreateList } from "./pages/CreateList";
import { Toaster } from "react-hot-toast";
import { EditList } from "./pages/EditList";

function App() {
  return (
    <div className="App">
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ListDetails />} />
        <Route path="/create" element={<CreateList />} />
        <Route path="/edit/:id" element={<EditList />} />

      </Routes>
    </div>
  );
}

export default App;
