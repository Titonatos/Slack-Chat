import {
  BrowserRouter, Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../routes.js';
import NotFound from './PageNotFound.jsx';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import Signup from './Signup.jsx';
import NavComponent from './NavComponent.jsx';

const PrivateOutlet = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Outlet /> : <Navigate to={routes.login()} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
    <NavComponent />
      <Routes>
        <Route path={routes.notFound()} element={<NotFound />} />
        <Route path={routes.chat()} element={<PrivateOutlet />}>
          <Route path="" element={<Chat />} />
        </Route>
        <Route path={routes.login()} element={<Login />} />
        <Route path={routes.signup()} element={<Signup />} />
      </Routes>
    </div>;
  </BrowserRouter>
);

export default App;