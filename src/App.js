import logo from './logo.svg';
import './App.css';
import DynamicForm from './dynamicForm';
import Door from './pages/door';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateDoor from './pages/door';
import ViewList from './pages/door/viewList';
import DetailsView from './pages/door/detailsView';


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/dynamic-form" element={<DynamicForm />} />
          <Route path="/createDoor" element={<CreateDoor />} />
          <Route path="/list" element={<ViewList />} />
          <Route path="/:id" element={<DetailsView/>} />
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
