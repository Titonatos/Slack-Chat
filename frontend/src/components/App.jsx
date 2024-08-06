import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from './PageNotFound.jsx';
import PrivatePage from './PrivatePage.jsx';
import LoginPage from './LoginPage.jsx';

function App() {
  return (
    <div className="h-100">
      <div className="h-100">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;