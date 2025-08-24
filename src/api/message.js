import { API } from '../config.js';
// // get method
// export const getMessages = async () => {
//     fetch('http://localhost:5000/api/messages')
//         .then((res) => res.json());
// }


// // post method
// export const sendMessage = async(message, sender) => {
//     await fetch('http://localhost:5000/api/messages', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ msg: message, sender }),
//     });
// }

// Function to fetch advice from backend, takes message as input
export const getKeywords = async() => {
    const response = await fetch(`${API}/keywords`);
    return response.json();
}

export const getAdvice = async (message) => {
  const response = await fetch(`${API}/firstaid?q=${encodeURIComponent(message)}`);
  return response; // return the response object
};

