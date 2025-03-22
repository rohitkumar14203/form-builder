import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateForm from "./pages/createForm/CreateForm";
import ViewForm from "./pages/viewForm/viewForm";
import EditForm from "./pages/editForm/EditForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/form/:id" element={<ViewForm />} />
        <Route path="/form/:id/edit" element={<EditForm />} />
      </Routes>
    </Router>
  );
};

export default App;
