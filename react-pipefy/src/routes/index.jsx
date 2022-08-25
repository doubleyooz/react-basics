import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Pipes from '../pages/Pipes';

const Paths = () => {
    return (
        <div className="h-full">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pipes" element={<Pipes />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Paths;