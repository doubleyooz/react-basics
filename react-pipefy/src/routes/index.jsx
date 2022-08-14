import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';

const Paths = () => {
    return (
        <div className="routes_container">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Paths;