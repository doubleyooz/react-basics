import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';

const Paths = () => {
    return (
        <div className="w-screen h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Paths;
