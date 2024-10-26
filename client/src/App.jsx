import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import DisplayAll from "./views/DisplayAll";
import DisplayUser from "./views/DisplayUser";
import ViewOnePost from "./views/ViewOnePost"
import Login from "./views/Login";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [errors, setErrors] = useState({});

  const errorUpdater = (newErrors) => {
   setErrors(newErrors);
  };

  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login errors={errors} errorUpdater={errorUpdater} />}/>
          <Route path="/bright_ideas" element={<DisplayAll />} />
          <Route path="/bright_ideas/:id" element={<ViewOnePost />} />
          <Route path="/users/:id" element={<DisplayUser />} />
        </Routes>
      </>
  );
}

export default App;
