import React, { useEffect, useState, useRef } from 'react';
import { getAdvice, getKeywords } from "./api/message.js"
import Loader from './Loader.jsx';
import {Send} from "lucide-react"
import './css/chatbox.css';


const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); 
  const [isMobile, setisMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [history, isLoading]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const data = await getKeywords(); // getKeywords should return JSON
        if (data) {
          setKeywords(data);
        } else {
          setError('No keywords found.');
        }
      } catch (err) {
        setError('Failed to fetch keywords.');
        console.error(err);
      }
    };

    fetchKeywords();
  }, []);

  useEffect(() => {
    const handleResize = () => {    
      setisMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.toLowerCase();

    // Add user's message to history
    setHistory(prev => [...prev, { sender: 'user', msg: message }]);
    setMessage('');

    try {
      setIsLoading(true);

      // Find a matching keyword
      const matchedKeywordObj = keywords.find(k =>
        userMessage.includes(k.keyword.toLowerCase())
      );
      const matchedKeyword = matchedKeywordObj?.keyword;

      // Decide what to send to getAdvice()
      const query = matchedKeyword || userMessage;

      // Fetch advice from API (database or OpenAI depending on match)
      const res = await getAdvice(query);
      const data = await res.json();

      setHistory(prev => [
        ...prev,
        {
          sender: 'bot',
          msg: data.advice || '⚠️ Sorry, no advice available for this query.',
        },
      ]);
    } catch (err) {
      console.error('Failed to get advice:', err);
      setHistory(prev => [
        ...prev,
        {
          sender: 'bot',
          msg: '⚠️ Error fetching advice. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div id="chatbox">
      <div className="header">AI First-Aid Chatbox</div>
      <div id="messages" className="messages">
        {history.map((item, index) => (
          <div key={index} className={`msg ${item.sender}`}>
            <b>{item.sender === 'user' ? 'You:' : 'ResQ AI:'}</b>{' '}
            {item.sender === 'bot' ? <pre>{item.msg}</pre> : item.msg}
          </div>
        ))}
        {/* Add loading indicator message */}
        {isLoading && (
          <div className="loader">
            <Loader />
            {/* <b>ResQ AI:</b> <pre>loading...</pre> */}
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Invisible anchor to scroll to */}

      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your emergency..."
          required
        />
        {/* <p>{JSON.stringify(keywords)}</p> */}
        {isMobile?<button type="submit" aria-label="Send" className='send'><Send /></button>:<input type="submit" value="Send" />
        }
      </form>
      {/* <p>{JSON.stringify(keywords)}</p> */}
      <p className="disclaimer">
        ⚠️ Educational use only. Call emergency services in real emergencies.
      </p>
    </div>
  );
};

export default Chatbox;
