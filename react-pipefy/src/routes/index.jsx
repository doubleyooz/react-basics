import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Pipes from '../pages/Pipes';

const Paths = () => {
    return (
        <div className="">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pipes" element={<Pipes />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Paths;