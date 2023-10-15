// import React from 'react';

// interface MessageCard {
//   user_query: string;
//   message: string;
// }

// interface MessageCardContext {
//   message: MessageCard | null; 
//   updateMessage: (query: string) => void;
//   isLoading: boolean;
//   error: string | null;
// }

// const MessageContext = React.createContext<MessageCardContext | undefined>(undefined);

// export default MessageContext;












import React from 'react';

interface MessageCard {
  user_query: string;
  message: string;
}

interface MessageCardContext {
  message: MessageCard | null;
  randomAuthorId: string | null;
  updateMessage: (query: string) => void;
  isLoading: boolean;
  error: string | null;
  setRandomAuthorId: React.Dispatch<React.SetStateAction<string | null>>;
}

const MessageContext = React.createContext<MessageCardContext | undefined>(undefined);

export default MessageContext;
