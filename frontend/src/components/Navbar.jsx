import React, { useContext, useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { close, unihub, menu } from '../assets';
import useLogout from '../Hooks/useLogout';
import { useAuthContext } from '../Hooks/useAuthContext';
import { LoadingContext } from '../Context/LoadingContext';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const { isAuthenticated } = useAuthContext();

  const [ isLoggedIn , setIsLoggedIn] = useState(false);

  console.log(isAuthenticated);

  const { loadingState, setIsLoadingState } = useContext(LoadingContext);

  const { logout } = useLogout();
  const handleLogout = () => {
    setIsLoadingState(true);
    logout();
    setIsLoadingState(false);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        setIsLoggedIn(true);
    }
}, [handleLogout]);

  return (
    <nav className="w-full flex justify-between items-center navbar py-6 z-10">
      <Link to="/" className="cursor-pointer">
        <img
          src={unihub}
          alt="UniHub"
          className="sm:w-[187.32px] sm:h-[66.84px] w-[131.124px] h-[46.788px]"
        />
      </Link>
      <ul className="list-none hidden justify-end items-center sm:flex flex-1">
        <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10">
          <Link to="/">Home</Link>
        </li>
        <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10">
          <Link to="/blogs">Blogs</Link>
        </li>
        <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10">
          <Link to="/maps">Map</Link>
        </li>
        <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10">
          <Link to="/contact">Contact us</Link>
        </li>
        <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10">
          <Link to="/features/college-events">Events</Link>
        </li>
        <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10">
          <Link to="/features">Features</Link>
        </li>
        {isLoggedIn && (
          <div>
            <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-blue-300 mr-10">
              <button onClick={handleLogout}>Log out</button>
            </li>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-blue-300 mr-10">
              <Link to="/login">Log in</Link>
            </li>
            <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-blue-300">
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`${
            toggle ? 'flex' : 'hidden'
          } bg-black-gradient absolute z-[10000] top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar p-6`}
        >
          <ul className="list-none flex flex-col z-10">
            <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10 mb-4">
              <Link to="/">Home</Link>
            </li>
            <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10 mb-4">
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10 mb-4">
              <Link to="/contact">Contact us</Link>
            </li>
            <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10 mb-4">
              <Link to="/features/college-events">Events</Link>
            </li>
            {isAuthenticated && (
              <div>
                <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10 mb-4">
                  <button onClick={handleLogout}>Log out</button>
                </li>
              </div>
            )}
            {!isAuthenticated && (
              <>
                <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10 mb-4">
                  <Link to="/login">Log in</Link>
                </li>
                <li className="font-poppins text-nowrap font-normal cursor-pointer text-[16px] text-white mr-10 mb-4">
                  <Link to="/signup">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
