import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Meals from "./pages/Meals";
import Meal from "./pages/Meal";
import Signup from "./pages/Signup";
import Reviews from "./pages/Reviews";


axios.defaults.baseURL = "http://localhost:8080";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/meals" element={<Meals />}></Route>
        <Route path="/meals/:id" element={<Meal />}>
            <Route path="/meals/:id/reviews" element={<Reviews/>}></Route>
        </Route>
        <Route path="/meals/:id/edit" element={<Meal />}></Route>
        <Route path="*" element={<h2>Not found!</h2>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;