import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAll from "./views/DisplayAll";
//import DisplayUser from "./views/DisplayUser";
import Login from "./views/Login";
import Navbar from "./components/Navbar";
import Register from "./views/Register";
import "./App.css";

function App() {
  // const [errors, setErrors] = useState({});

  //const errorUpdater = (newErrors) => {
  //  setErrors(newErrors);
  //};

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          {/* <Route
            path="/"
            element={<Login errors={errors} errorUpdater={errorUpdater} />}
          />*/}
          <Route path="/bright_ideas" element={<DisplayAll />} />
          {/*<Route path="/bright_ideas/:id" element={<DisplayOne />} />*/}
          {/* <Route path="/users/:id" element={<DisplayUser />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
