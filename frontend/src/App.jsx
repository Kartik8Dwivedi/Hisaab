import {Route, Routes} from 'react-router'
import Home from './components/Home'
import Layout from './layouts/Layout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignIn/>} />
        <Route exact path="/signup" element={<SignUp/>} />
    </Routes>
  );
}

export default App
