import React, { createContext, useReducer } from 'react';

import io from 'socket.io-client';

export const CTX = createContext();

const initialState = {
  general: [
    {
      author: { name: 'Victor Kmita' },
      message: { content: 'Hello world' },
    },
    {
      author: { name: 'VChat Bot' },
      message: { content: 'Hi victor' },
    },
  ],
  random: [{
    author: { name: 'Victor Kmita' },
    message: { content: 'Cats make me sneeze' },
  }],
}

/*
  state = {
    [topic]: Array<{
      author: { name: String },
      message: { content: String }, 
    }>
  }
*/

function reducer(state, action) {
  console.log(action)
  switch(action.type) {
    case 'RECEIVE_MESSAGE': 
      return {
        ...state,
        [action.payload.topic]: [
          ...state[action.payload.topic],
          { 
            author: { name: action.payload.author.name }, 
            message: { content: action.payload.message.content } ,
          },
        ]
      }
    default:
      return state;
  }
}

function sendChatAction(content) {
  socket.emit('message', content);
} 

// make sure we don't create a new connection each time we
// change the store
let socket;
export default function Store(props) {
  const [messagesByTopic, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(':3001');
    socket.on('message', message => {
      console.log(message);
      dispatch({ type: 'RECEIVE_MESSAGE', payload: message })
    })
  }


  return <CTX.Provider value={{ messagesByTopic, sendChatAction }}>
    {props.children}
  </CTX.Provider>
}