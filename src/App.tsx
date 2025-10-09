import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import CustomizationPanel from './components/CustomizationPanel';

const DEFAULT_MESSAGE = "Thank you for your endless love, support, and guidance. You are the best mom in the world, and I'm so grateful for everything you do. Wishing you a day as beautiful as you are.";
const DEFAULT_SIGNATURE = "With all my love,";
const DEFAULT_NAME = "Your Loving Child";
const DEFAULT_RECIPIENT = "Mom";
const DEFAULT_FONT = "'Montserrat', sans-serif";
const DEFAULT_DESIGN = "dashed-border";
const DEFAULT_CARD_TYPE = "birthday";
const DEFAULT_BORDER_COLOR = "#fecdd3"; // rose-300
const DEFAULT_HEADING_COLOR = "#f43f5e"; // rose-500
const DEFAULT_MESSAGE_COLOR = "#374151"; // gray-700
const DEFAULT_SIGNATURE_COLOR = "#f43f5e"; // rose-500
const DEFAULT_NAME_COLOR = "#4b5563"; // gray-600

const App: React.FC = () => {
  const [message, setMessage] = useState<string>(DEFAULT_MESSAGE);
  const [signature, setSignature] = useState<string>(DEFAULT_SIGNATURE);
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [recipient, setRecipient] = useState<string>(DEFAULT_RECIPIENT);
  const [font, setFont] = useState<string>(DEFAULT_FONT);
  const [design, setDesign] = useState<string>(DEFAULT_DESIGN);
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [cardType, setCardType] = useState<string>(DEFAULT_CARD_TYPE);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [borderColor, setBorderColor] = useState<string>(DEFAULT_BORDER_COLOR);
  const [headingColor, setHeadingColor] = useState<string>(DEFAULT_HEADING_COLOR);
  const [messageColor, setMessageColor] = useState<string>(DEFAULT_MESSAGE_COLOR);
  const [signatureColor, setSignatureColor] = useState<string>(DEFAULT_SIGNATURE_COLOR);
  const [nameColor, setNameColor] = useState<string>(DEFAULT_NAME_COLOR);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true to check URL

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardDataParam = urlParams.get('card');

    if (cardDataParam) {
      try {
        const decodedData = atob(decodeURIComponent(cardDataParam));
        const data = JSON.parse(decodedData);
        // Set state from URL data
        setMessage(data.message || DEFAULT_MESSAGE);
        setSignature(data.signature || DEFAULT_SIGNATURE);
        setName(data.name || DEFAULT_NAME);
        setRecipient(data.recipient || DEFAULT_RECIPIENT);
        setFont(data.font || DEFAULT_FONT);
        setDesign(data.design || DEFAULT_DESIGN);
        setCardType(data.cardType || DEFAULT_CARD_TYPE);
        setCustomTitle(data.customTitle || '');
        setBorderColor(data.borderColor || DEFAULT_BORDER_COLOR);
        setHeadingColor(data.headingColor || DEFAULT_HEADING_COLOR);
        setMessageColor(data.messageColor || DEFAULT_MESSAGE_COLOR);
        setSignatureColor(data.signatureColor || DEFAULT_SIGNATURE_COLOR);
        setNameColor(data.nameColor || DEFAULT_NAME_COLOR);
        setBackgroundImages(data.backgroundImages || []);
        setIsViewMode(true);
      } catch (error) {
        console.error("Failed to parse card data from URL", error);
        // If parsing fails, just show the editor
        setIsViewMode(false);
      }
    } else {
        setIsViewMode(false);
    }
    setIsLoading(false);
  }, []);

  const handleCreateOwn = () => {
    // Reset state to default for a fresh card
    setMessage(DEFAULT_MESSAGE);
    setSignature(DEFAULT_SIGNATURE);
    setName(DEFAULT_NAME);
    setRecipient(DEFAULT_RECIPIENT);
    setFont(DEFAULT_FONT);
    setDesign(DEFAULT_DESIGN);
    setBackgroundImages([]);
    setCardType(DEFAULT_CARD_TYPE);
    setCustomTitle('');
    setBorderColor(DEFAULT_BORDER_COLOR);
    setHeadingColor(DEFAULT_HEADING_COLOR);
    setMessageColor(DEFAULT_MESSAGE_COLOR);
    setSignatureColor(DEFAULT_SIGNATURE_COLOR);
    setNameColor(DEFAULT_NAME_COLOR);
    
    // Switch to edit mode
    setIsViewMode(false);
    
    // Clean the URL parameter without reloading the page
    window.history.pushState({}, document.title, window.location.pathname);
  };
  
  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-fuchsia-200 to-indigo-300 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-500" aria-label="Loading..."></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-fuchsia-200 to-indigo-300 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%2095C25.147%2095%205%2074.853%205%2050S25.147%205%2050%205s45%2020.147%2045%2045-20.147%2045-45%2045z%22%20fill=%22rgba(255,255,255,0.05)%22/%3E%3C/svg%3E')] opacity-50 [background-size:20px_20px]"></div>
      <div className="relative container mx-auto max-w-2xl text-center space-y-8">
        <Card 
            message={message} 
            signature={signature} 
            name={name} 
            recipient={recipient}
            font={font}
            design={design}
            backgroundImages={backgroundImages}
            cardType={cardType}
            customTitle={customTitle}
            borderColor={borderColor}
            headingColor={headingColor}
            messageColor={messageColor}
            signatureColor={signatureColor}
            nameColor={nameColor}
        />
        
        {isViewMode ? (
           <div key="viewer" className="animate-fade-in">
             <button
              onClick={handleCreateOwn}
              className="inline-block bg-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Create your own virtual card"
            >
              Create Your Own Card
            </button>
           </div>
        ) : (
          <div key="editor" className="animate-fade-in">
            <CustomizationPanel
              message={message}
              setMessage={setMessage}
              signature={signature}
              setSignature={setSignature}
              name={name}
              setName={setName}
              recipient={recipient}
              setRecipient={setRecipient}
              font={font}
              setFont={setFont}
              design={design}
              setDesign={setDesign}
              backgroundImages={backgroundImages}
              setBackgroundImages={setBackgroundImages}
              cardType={cardType}
              setCardType={setCardType}
              customTitle={customTitle}
              setCustomTitle={setCustomTitle}
              borderColor={borderColor}
              setBorderColor={setBorderColor}
              headingColor={headingColor}
              setHeadingColor={setHeadingColor}
              messageColor={messageColor}
              setMessageColor={setMessageColor}
              signatureColor={signatureColor}
              setSignatureColor={setSignatureColor}
              nameColor={nameColor}
              setNameColor={setNameColor}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default App;