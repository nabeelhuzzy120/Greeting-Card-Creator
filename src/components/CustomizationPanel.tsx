import React, { useState, ChangeEvent } from 'react';

interface CustomizationPanelProps {
  message: string;
  setMessage: (msg: string) => void;
  signature: string;
  setSignature: (sig: string) => void;
  name: string;
  setName: (name: string) => void;
  recipient: string;
  setRecipient: (name: string) => void;
  font: string;
  setFont: (font: string) => void;
  design: string;
  setDesign: (design: string) => void;
  backgroundImages: string[];
  setBackgroundImages: (images: string[]) => void;
  cardType: string;
  setCardType: (type: string) => void;
  customTitle: string;
  setCustomTitle: (title: string) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  headingColor: string;
  setHeadingColor: (color: string) => void;
  messageColor: string;
  setMessageColor: (color: string) => void;
  signatureColor: string;
  setSignatureColor: (color: string) => void;
  nameColor: string;
  setNameColor: (color: string) => void;
}

interface AccordionItemProps {
    id: string;
    title: string;
    children: React.ReactNode;
    activeAccordion: string;
    toggleAccordion: (id: string) => void;
}

const MAX_SIGNATURE_LENGTH = 30;
const MAX_NAME_LENGTH = 30;
const MAX_RECIPIENT_LENGTH = 30;
const MAX_CUSTOM_TITLE_LENGTH = 40;
const MAX_IMAGES = 5;

const resizeAndCompressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            if (!event.target?.result) {
                return reject(new Error("Couldn't read file"));
            }
            img.src = event.target.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1024;
                const MAX_HEIGHT = 1024;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Could not get canvas context'));
                }
                ctx.drawImage(img, 0, 0, width, height);
                
                // Use JPEG for better compression for photos, with a quality of 0.7
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};


const AccordionItem: React.FC<AccordionItemProps> = ({id, title, children, activeAccordion, toggleAccordion}) => (
    <div className="border border-rose-200/80 rounded-lg overflow-hidden">
        <h2>
            <button type="button" onClick={() => toggleAccordion(id)} className="flex items-center justify-between w-full p-4 font-semibold text-left text-gray-800 bg-rose-50 hover:bg-rose-100 transition-colors" aria-expanded={activeAccordion === id}>
                <span>{title}</span>
                 <svg className={`w-4 h-4 shrink-0 transition-transform ${activeAccordion === id ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
        </h2>
        <div className={`p-4 bg-white ${activeAccordion === id ? 'block' : 'hidden'}`}>
            {children}
        </div>
    </div>
  );

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  message, setMessage, signature, setSignature, name, setName, recipient, setRecipient,
  font, setFont, design, setDesign, backgroundImages, setBackgroundImages,
  cardType, setCardType, customTitle, setCustomTitle, borderColor, setBorderColor,
  headingColor, setHeadingColor, messageColor, setMessageColor, signatureColor, setSignatureColor, nameColor, setNameColor
}) => {
  const [copyButtonText, setCopyButtonText] = useState('Generate & Copy Link');
  const [activeAccordion, setActiveAccordion] = useState<string>('content');

  const handleGenerateLink = () => {
    const cardData = {
      message, signature, name, recipient, font, design,
      cardType, customTitle, borderColor, headingColor, messageColor,
      signatureColor, nameColor, backgroundImages
    };

    try {
      const serializedData = JSON.stringify(cardData);
      const encodedData = btoa(serializedData);
      
      const baseUrl = new URL(window.location.href);
      baseUrl.search = ''; // Clear existing params
      baseUrl.searchParams.set('card', encodeURIComponent(encodedData));
      
      const shareableUrl = baseUrl.toString();

      navigator.clipboard.writeText(shareableUrl).then(() => {
        setCopyButtonText('Link Copied!');
        setTimeout(() => setCopyButtonText('Generate & Copy Link'), 2000);
      }).catch(err => {
        console.error("Failed to copy link: ", err);
        alert("Failed to copy link. Please try again.");
      });

    } catch (error) {
      console.error("Error generating link:", error);
      alert("Sorry, there was an error creating your shareable link.");
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const files = Array.from(e.target.files);
        const imagePromises: Promise<string>[] = [];
        
        files.slice(0, MAX_IMAGES - backgroundImages.length).forEach(file => {
            imagePromises.push(resizeAndCompressImage(file));
        });

        Promise.all(imagePromises).then(newImages => {
            setBackgroundImages([...backgroundImages, ...newImages]);
        }).catch(error => {
            console.error("Error processing images:", error);
            alert("Sorry, there was an error processing your images.");
        });
    }
  };

  const removeImage = (index: number) => {
      setBackgroundImages(backgroundImages.filter((_, i) => i !== index));
  }
  
  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 w-full text-left transition-all duration-300">
      <h2 className="font-bold text-xl sm:text-2xl text-gray-800 mb-6 text-center">Customize Your Card</h2>
      <div className="space-y-4">

        <AccordionItem id="content" title="Card Content" activeAccordion={activeAccordion} toggleAccordion={toggleAccordion}>
            <div className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="cardType" className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
                        <select id="cardType" value={cardType} onChange={(e) => setCardType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200">
                            <option value="birthday">Happy Birthday</option>
                            <option value="congrats">Congratulations</option>
                            <option value="grad">Graduation</option>
                            <option value="thank-you">Thank You</option>
                            <option value="custom">Custom...</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                        <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} maxLength={MAX_RECIPIENT_LENGTH} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200" placeholder="e.g., Mom, Dad, Sarah" />
                        <p className="text-right text-xs text-gray-500 mt-1">{MAX_RECIPIENT_LENGTH - recipient.length} characters remaining</p>
                    </div>
                </div>
                 {cardType === 'custom' && (
                    <div className="animate-fade-in">
                        <label htmlFor="customTitle" className="block text-sm font-medium text-gray-700 mb-1">Custom Title</label>
                        <input type="text" id="customTitle" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} maxLength={MAX_CUSTOM_TITLE_LENGTH} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200" placeholder="e.g., Happy Anniversary"/>
                        <p className="text-right text-xs text-gray-500 mt-1">{MAX_CUSTOM_TITLE_LENGTH - customTitle.length} characters remaining</p>
                    </div>
                 )}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200" placeholder="Write your heartfelt message here..."></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">Signature</label>
                        <input type="text" id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} maxLength={MAX_SIGNATURE_LENGTH} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200" placeholder="e.g., With love,"/>
                        <p className="text-right text-xs text-gray-500 mt-1">{MAX_SIGNATURE_LENGTH - signature.length} characters remaining</p>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={MAX_NAME_LENGTH} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200" placeholder="e.g., Jane Doe"/>
                        <p className="text-right text-xs text-gray-500 mt-1">{MAX_NAME_LENGTH - name.length} characters remaining</p>
                    </div>
                </div>
            </div>
        </AccordionItem>

        <AccordionItem id="appearance" title="Card Appearance" activeAccordion={activeAccordion} toggleAccordion={toggleAccordion}>
            <div className="space-y-6">
                <div>
                    <label htmlFor="font" className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                    <select id="font" value={font} onChange={(e) => setFont(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200">
                        <option value="'Montserrat', sans-serif">Montserrat</option>
                        <option value="'Great Vibes', cursive">Great Vibes (Fancy)</option>
                        <option value="'Poppins', sans-serif">Poppins</option>
                        <option value="'Dancing Script', cursive">Dancing Script</option>
                        <option value="'Merriweather', serif">Merriweather</option>
                        <option value="'Roboto', sans-serif">Roboto</option>
                        <option value="'Playfair Display', serif">Playfair Display</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="design" className="block text-sm font-medium text-gray-700 mb-1">Page Design</label>
                    <select id="design" value={design} onChange={(e) => setDesign(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent transition duration-200">
                        <option value="dashed-border">Dashed Border</option>
                        <option value="floral-corners">Floral Corners</option>
                        <option value="none">None</option>
                    </select>
                </div>
                 <div className="flex items-center gap-4">
                    <label htmlFor="borderColor" className="block text-sm font-medium text-gray-700">Border & Accent Color</label>
                    <input type="color" id="borderColor" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-10 h-10 p-1 border border-gray-300 rounded-lg shadow-sm cursor-pointer" />
                </div>
                 <div className="border-t border-rose-200 pt-6 mt-6">
                    <p className="text-sm font-medium text-gray-700 mb-4">Text Colors</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="headingColor" className="text-sm text-gray-600">Heading</label>
                            <input type="color" id="headingColor" value={headingColor} onChange={(e) => setHeadingColor(e.target.value)} className="w-8 h-8 p-1 border border-gray-300 rounded-md shadow-sm cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="messageColor" className="text-sm text-gray-600">Message</label>
                            <input type="color" id="messageColor" value={messageColor} onChange={(e) => setMessageColor(e.target.value)} className="w-8 h-8 p-1 border border-gray-300 rounded-md shadow-sm cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="signatureColor" className="text-sm text-gray-600">Signature</label>
                            <input type="color" id="signatureColor" value={signatureColor} onChange={(e) => setSignatureColor(e.target.value)} className="w-8 h-8 p-1 border border-gray-300 rounded-md shadow-sm cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="nameColor" className="text-sm text-gray-600">Name</label>
                            <input type="color" id="nameColor" value={nameColor} onChange={(e) => setNameColor(e.target.value)} className="w-8 h-8 p-1 border border-gray-300 rounded-md shadow-sm cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Image/Collage</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100" disabled={backgroundImages.length >= MAX_IMAGES} />
                    <p className="text-xs text-gray-500 mt-1">Upload up to {MAX_IMAGES} images. Select one for a background or multiple for a collage.</p>
                     <div className="mt-4 flex flex-wrap gap-2">
                        {backgroundImages.map((img, index) => (
                            <div key={index} className="relative group">
                                <img src={img} alt={`upload-preview-${index}`} className="h-16 w-16 object-cover rounded-md" />
                                <button onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AccordionItem>
        
        <AccordionItem id="share" title="Share Your Card" activeAccordion={activeAccordion} toggleAccordion={toggleAccordion}>
            <div className="flex flex-col items-center text-center">
                 <p className="text-sm text-gray-600 mb-4">
                    Generate a unique link to your animated card to share anywhere! Your design, including any custom images, will be included.
                 </p>
                <button onClick={handleGenerateLink} className="w-full sm:w-auto px-8 py-3 font-bold text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" aria-live="polite">
                    {copyButtonText}
                </button>
            </div>
        </AccordionItem>
      </div>
    </div>
  );
};

export default CustomizationPanel;