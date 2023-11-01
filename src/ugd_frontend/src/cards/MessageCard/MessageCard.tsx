import React, { useState, useContext } from 'react';
import '@/styles/MessageCard/MessageCard.css';
import CardFront from './CardFront';
import CardBack from './CardBack';
import MessageContext from '@/contexts/MessageContext';
import UserProfile from './UserProfile';
import DetailsHeader from './DetailsHeader';
import CardDetailsFront from './CardDetailsFront';
import CardDetailsBack from './CardDetailsBack';

const MessageCard: React.FC = () => {
  const [cardFlipped, setCardFlipped] = useState(false);
  const [messageType, setMessageType] = useState('output')

  const context = useContext(MessageContext);
  const messageData = context?.message;
  const currentAuthorId = context?.currentAuthorId;

  const handleClick = () => {
    setCardFlipped(!cardFlipped);
  };


  const UpdateMessageType = (messageType: string) => {
    setMessageType(messageType)
  }

  if (!currentAuthorId || !messageData) return null;

  return (

    <div className="mainMessageCard">
      <div className="innerMessageCard">
        <UserProfile currentAuthorId={currentAuthorId} InputMessage={messageData.user_query} />
        <div className="messageCardDetails">
          <div className="innerMessageCardDetails">
            <DetailsHeader onFlip={handleClick} onMessageTypeUpdate={UpdateMessageType} messageType={messageType} />

            <div className="messageMainCradDetails">
              <div className={cardFlipped ? "cardFetailsFilpper flip" : "cardFetailsFilpper"}>
                <CardDetailsFront messageData={messageData} messageType={messageType} />
                <CardDetailsBack currentAuthorId={currentAuthorId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    // <div className={`message-card-wrapper ${cardFlipped ? 'cardFlipped' : ''}`}>
    //   <div className="message-card">
    //     <CardFront messageData={messageData} onFlip={handleClick} currentAuthorId={currentAuthorId} />
    //     <CardBack onFlip={handleClick} currentAuthorId={currentAuthorId} />
    //   </div>
    // </div>
  );
};

export default MessageCard;
