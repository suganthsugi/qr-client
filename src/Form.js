import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Form() {
  const [username, setUsername] = useState('');
  const [phno, setPhno] = useState('');
  const [reason, setReason] = useState('');
  const [trust, setTrust] = useState(false);
  const [feedback, setFeedback] = useState('');

  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://qr-n5bh.onrender.com/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName:username,
          phno,
          reason,
          trust,
          feedback
        })
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="text" value={phno} onChange={(event) => setPhno(event.target.value)} />
      </label>
      <br />
      <label>
        Reason:
        <input type="text" value={reason} onChange={(event) => setReason(event.target.value)} />
      </label>
      <br />
      <label>
        Trust:
        <input type="checkbox" checked={trust} onChange={(event) => setTrust(event.target.checked)} />
      </label>
      <br />
      <label>
        Feedback:
        <textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
