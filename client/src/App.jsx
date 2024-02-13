import { useState } from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

function App() {
  const [chatVisible, setChatVisible] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <div>
      {
        chatVisible ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisible={setChatVisible} />
      }
    </div>
  )
}

export default App;
