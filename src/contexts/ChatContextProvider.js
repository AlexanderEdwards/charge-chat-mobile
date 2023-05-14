import React, { useReducer } from 'react';

const initialState = [
  {id: 1, author: 'ChargeChat', text: 'Welcome to ChargeChat!'},
  //...other initial messages
];

function reducer(state, action) {
  switch (action.type) {
    case 'add_message':
      console.log('adding message', state, action);
      return [...state, action.payload];
    default:
      throw new Error();
  }
}

export const ChatContext = React.createContext();

export function ChatContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMessage = (message) => {
    dispatch({ type: 'add_message', payload: message });
  };

  return (
    <ChatContext.Provider value={{ messages: state, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
