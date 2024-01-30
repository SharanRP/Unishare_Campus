
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import styles from './style';
import './index.css';
import {
  Navbar,
  Footer,
  Contact,
  Home,
  Blogs,
  CreateNewPost,
  Login,
  Signup,
  PointerCal,
  Papers,
  CalenderPage,
} from './components/index';
import FixedButton from './components/FixedButton';
import { useAuthContext } from './Hooks/useAuthContext';
import RequireAuth from './Hooks/RequireAuth';
import Blog from './components/Blog';
import MainFeatures from './components/MainFeatures';
import { LoadingContext } from './Context/LoadingContext';
import Homepage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import './App.css';
import ChatProvider from './Context/chatProvider';
import LogIn from './components/Authentication/LogIn';
import SignUp from './components/Authentication/SignUp';
import LostAndFound from "./components/LostAndFound";
import InteractiveMap from './components/maps';

const App = () => {
  const [isvisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthContext();
  const { loadingState, setIsLoadingState } = useContext(LoadingContext);

  useEffect(() => {
    if (window.location.pathname !== '/') return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200 && window.scrollY < 2350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const shouldShowFooter =
    ![ '/features/chats' , '/features/community' , '/maps'].includes(window.location.pathname) && !loadingState;

  return (
  <ChakraProvider>
   <ChatProvider>
    <div className="bg-primary  overflow-hidden">

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {isvisible && window.location.pathname === '/' && <FixedButton />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/blogs">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <Blogs />
              </RequireAuth>
            }
          />
          <Route
            path=":id"
            element={
              <RequireAuth redirectTo="/login">
                <Blog />
              </RequireAuth>
            }
          />
        </Route> */}
        <Route path="/blogs">
          <Route index element={<Blogs />} />
          <Route path=":id" element={<Blog />} />
        </Route>
        <Route path="/blogs/create" element={<CreateNewPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<div className='mx-0 my-12 py-6  relative w-1/2 left-1/4 '><LogIn /></div>} />
        <Route path="/signup" element={<div className='mx-0 my-12 py-6 px-0 relative w-1/2 left-1/4 '><SignUp /></div>} />
        <Route path="/features" element={<MainFeatures />} />
        {/* <div className="App"> */}
        <Route path="/features/community" element={<Homepage />}  />
        <Route path="/features/chats" element={<ChatPage />} />
        {/* </div> */}

        <Route
          path="/features/pointer-calculator"
          element={
            <div className=' bg-gradient-to-r flex  from-indigo-300 via-purple-200 to-pink-200  border mx-6 my-auto p-5 rounded-lg'>
              <PointerCal />
            </div>
          }
        />

        <Route path="/features/previous-year-papers" element={<Papers />} />
        <Route path="/features/chat-bot" element={<MainFeatures />} />
        <Route path="/features/college-events" element={<CalenderPage />} />
        {/* <Route path="/features/community" element={<ChatPage />} />
        <Route path="/features/community" element={<MainFeatures />} /> */}
        <Route path="/features/lost-and-found" element={<LostAndFound />} />
        <Route path = "/maps" element = {<InteractiveMap />} />
      </Routes>

      {shouldShowFooter && (
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      )}
    </div>
    </ChatProvider>
  </ChakraProvider>
  );
};

export default App;
