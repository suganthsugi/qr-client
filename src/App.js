import './App.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

function App() {

  const [id, setId] = useState(0);
  const [canShow, setCanShow] = useState(false)
  const [isFetching, setIsFetching] = useState(true);
  const [qr, setQr] = useState(0);
  const [showQr, setShowQr] = useState(true)

  useEffect(() => {
    let interval;
    if (isFetching) {
      interval = setInterval(() => {
        fetch(`https://qr-n5bh.onrender.com/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log(data.data);
            if (data.data === true) {
              setIsFetching(false);
              setCanShow(true);
            }
          })
          .catch(error => console.error(error))
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isFetching, id]);

  const QRCodeGenerator = ({ url }) => {
    return (
      <QRCode
        value={url}
        size={256}
        fgColor="#000000"
        bgColor="#FFFFFF"
        level="H"
        renderAs="svg"
      />
    );
  };

  const handleClick = () => {
    fetch('https://qr-n5bh.onrender.com/new')
      .then(response => response.json())
      .then(data => { console.log(data.id); setId(data.id);  setQr(QRCodeGenerator({url:`/form/${data.id}`}))}, setShowQr(true))
      .catch(error => console.error(error))
  }


  return (
    <div className="App">
      <h3>Return Order</h3>
      <Button onClick={handleClick}>New Return Order</Button>
      <br></br>
      <br></br>
      {showQr?qr:""}
      <br></br>
      <h1>{canShow ? "Successfully submitted" : ""}</h1>
    </div>
  );
}

export default App;
