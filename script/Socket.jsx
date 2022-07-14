
let isSocket = null;

export default function Socket ({ path, token, onClose, onOpen, onMessage }) {

  // we verify there isn't any previous socket
  if (isSocket) return;
  isSocket = true;

  // we create the socket
  const ws = new WebSocket(
    `wss://brainstormapi.nathanti.repl.co` + path + '?token=' + token
  );

  // when we receive a message
  ws.onmessage = evt => {
    onMessage(JSON.parse(evt.data));
  };

  // when the socket is closed, it reconnects automatically
  ws.onclose = () => {
    isSocket = null;
    setTimeout(() => {
      Socket({ path, token, onClose, onOpen, onMessage });
    }, 1000);
    onClose();
  };

  // when the socket is opened
  ws.onopen = onOpen.bind(this, ws);
}