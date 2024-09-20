import { io } from 'socket.io-client';
import ReactDOM from 'react-dom/client';
import init from './Init';

const chatApp = async () => {
  const socket = io('');
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init(socket));
};

chatApp();
