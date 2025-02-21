import { useEffect, useState } from 'react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}/api/hello`)
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    setMessage("Hello World");
  }, []);

  return (
    <div>
      <h1>{baseUrl} {message}</h1>
    </div>
  );
}

export default App;

