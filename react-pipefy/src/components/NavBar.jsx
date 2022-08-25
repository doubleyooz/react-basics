import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="flex justify-between items-center h-14 mx-3 border-b">
            <div className="flex gap-4">
                <NavLink to="/">
                    <img
                        className="h-5"
                        src="https://pipestyle.staticpipefy.com/default/images/logo-black.svg"
                        alt=""
                    />
                </NavLink>

                <NavLink to="/pipes">pipe title</NavLink>
            </div>
            <NavLink to="/login">User</NavLink>
            
        </div>
    );
};

export default NavBar;
