import React, { useState, useRef } from 'react';
import { HeartIcon, SendIcon, PaperclipIcon, SpinnerIcon } from '../constants'; 

interface SubmissionFormProps {
  loggedInUser: string;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ loggedInUser }) => {
  const [submission, setSubmission] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For main form
  const [error, setError] = useState<string | null>(null); // For main form
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New state for GIF actions
  const [isSendingHug, setIsSendingHug] = useState(false);
  const [hugStatus, setHugStatus] = useState<string | null>(null);
  const [isSendingKiss, setIsSendingKiss] = useState(false);
  const [kissStatus, setKissStatus] = useState<string | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      // Clear GIF statuses if a new file is selected for the main message
      setHugStatus(null);
      setKissStatus(null);
    } else {
      setSelectedFile(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const sendGifAction = async (gifType: 'hug' | 'kiss') => {
    const setIsLoadingAction = gifType === 'hug' ? setIsSendingHug : setIsSendingKiss;
    const setStatusAction = gifType === 'hug' ? setHugStatus : setKissStatus;

    setIsLoadingAction(true);
    setStatusAction(`Sending ${gifType}...`);
    setError(null); // Clear main form error
    setKissStatus(gifType === 'hug' ? null : kissStatus); // Clear other GIF status
    setHugStatus(gifType === 'kiss' ? null : hugStatus); // Clear other GIF status
    setSelectedFile(null); // Clear selected file for main form if any
    if(fileInputRef.current) fileInputRef.current.value = "";


    const randomId = Math.floor(Math.random() * 10) + 1;
    const gifName = `${gifType}${randomId}.gif`;
    const gifPath = `/assets/${gifName}`; // Assumes GIFs are in public/assets/

    try {
      const gifResponse = await fetch(gifPath);
      if (!gifResponse.ok) {
        throw new Error(`${gifType.charAt(0).toUpperCase() + gifType.slice(1)} GIF (${gifName}) not found. Please ensure it's in the public/assets/ folder, my love.`);
      }
      const gifBlob = await gifResponse.blob();
      // Use a generic name like 'attachment.gif' or the actual gifName for the File object.
      // The backend will use 'filename' from Content-Disposition if it processes it.
      const gifFile = new File([gifBlob], gifName, { type: gifBlob.type || 'image/gif' });

      const formData = new FormData();
      formData.append('loggedInUser', loggedInUser);
      formData.append('file', gifFile); // The GIF itself
      const messageText = gifType === 'hug' 
        ? `Sending you a warm virtual hug! 🤗\n(This is ${gifName} coming your way!)`
        : `Sending you a sweet virtual kiss! 😘\n(This is ${gifName} sealed with love!)`;
      const subjectText = gifType === 'hug' 
        ? `A Special Hug For You! 🤗` 
        : `A Loving Kiss For You! 😘`;
      formData.append('message', messageText);
      formData.append('subject', subjectText);
      
      const apiUrl = `${window.location.origin}/api/send-email`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        let errorMsg = `Our ${gifType} message bird seems to have hit a snag (HTTP ${response.status}). Please try again.`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
        } catch (parseError) { /* ignore */ }
        throw new Error(errorMsg);
      }
      
      setStatusAction(`${gifType.charAt(0).toUpperCase() + gifType.slice(1)} sent successfully! ❤️`);
      setTimeout(() => setStatusAction(null), 4000);

    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : `An unexpected error occurred while sending ${gifType}.`;
      setStatusAction(errorMessage);
      console.error(`Error sending ${gifType}:`, err);
      // Keep error message visible longer
      setTimeout(() => setStatusAction(null), 6000);
    } finally {
      setIsLoadingAction(false);
    }
  };
  
  const handleSendHug = () => sendGifAction('hug');
  const handleSendKiss = () => sendGifAction('kiss');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submission.trim() === '' && !selectedFile) return;

    setIsLoading(true); // Main form loading
    setError(null);
    setIsSent(false);
    // Clear GIF statuses when main form is used
    setHugStatus(null); 
    setKissStatus(null);
    
    const apiUrl = `${window.location.origin}/api/send-email`;
    
    try {
      let requestBody: FormData | string;
      const headers: HeadersInit = {};

      if (selectedFile) {
        const formData = new FormData();
        formData.append('message', submission);
        formData.append('loggedInUser', loggedInUser);
        formData.append('file', selectedFile);
        // Add a subject if a file is attached with the main message
        formData.append('subject', `A heartfelt message with an attachment just for you, my love!`);
        requestBody = formData;
      } else {
        headers['Content-Type'] = 'application/json';
        requestBody = JSON.stringify({ 
            message: submission, 
            loggedInUser,
            subject: `A heartfelt message just for you, my love!` // Subject for text-only message
        });
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: selectedFile ? {} : headers,
        body: requestBody,
      });

      if (!response.ok) {
        let errorMsg = `Our message bird seems to have hit a snag (HTTP ${response.status}). Please try again.`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
        } catch (parseError) { /* fallback */ }
        throw new Error(errorMsg);
      }
      
      setIsSent(true);
      setSubmission('');
      setSelectedFile(null); 
      if(fileInputRef.current) fileInputRef.current.value = ""; 
      setTimeout(() => setIsSent(false), 4000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message + (selectedFile ? " (Note: If this was a file upload, the server might need a moment.)" : ""));
      } else {
        setError('An unexpected error occurred. Please try again, my love.');
      }
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const actionButtonClasses = "py-2 px-3 bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-lg transform transition-all duration-500 hover:shadow-2xl">
      <div className="flex flex-col items-center mb-6 sm:mb-8">
         <div className="p-3 bg-pink-100 rounded-full mb-3 sm:mb-4">
          <HeartIcon className="w-10 h-10 sm:w-12 sm:h-12 text-pink-500 animate-pulse-heart-glow" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-pink-600 mb-1 sm:mb-2 text-center">Share Your Heart</h1>
        <p className="text-center text-gray-500 text-xs sm:text-sm max-w-md">
          Dearest, this is our special place. Feel free to share anything that's on your mind. Your words help our love blossom.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          placeholder="Pour your heart out here, my love..."
          rows={5}
          className="w-full p-3 sm:p-4 bg-white border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none text-sm sm:text-base transition-colors placeholder-gray-400 text-gray-700 mb-4"
          disabled={isLoading || isSendingHug || isSendingKiss}
          aria-label="Your message"
        />

        {/* Action Buttons and their statuses */}
        <div className="mb-4"> {/* Groups action buttons and their related messages, provides space below */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={triggerFileInput}
              className={actionButtonClasses}
              disabled={isLoading || isSendingHug || isSendingKiss}
              aria-label="Attach file"
              title="Attach file (image, video, doc)"
            >
              <PaperclipIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Attach</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*,video/*,.doc,.docx,.pdf,.txt,.md" 
            />
            <button
              type="button"
              onClick={handleSendHug}
              className={actionButtonClasses}
              disabled={isLoading || isSendingHug || isSendingKiss}
              aria-label="Send a Hug GIF"
              title="Send a random Hug GIF"
            >
              {isSendingHug ? (
                <SpinnerIcon className="w-4 h-4 animate-spin" />
              ) : (
                <span role="img" aria-label="hug emoji">🤗</span>
              )}
              <span className="hidden sm:inline">{isSendingHug ? 'Sending...' : 'Hug'}</span>
            </button>
            <button
              type="button"
              onClick={handleSendKiss}
              className={actionButtonClasses}
              disabled={isLoading || isSendingHug || isSendingKiss}
              aria-label="Send a Kiss GIF"
              title="Send a random Kiss GIF"
            >
              {isSendingKiss ? (
                <SpinnerIcon className="w-4 h-4 animate-spin" />
              ) : (
                <span role="img" aria-label="kiss emoji">😘</span>
              )}
              <span className="hidden sm:inline">{isSendingKiss ? 'Sending...' : 'Kiss'}</span>
            </button>
          </div>
          
          {selectedFile && !isSendingHug && !isSendingKiss && (
            <p className="text-xs text-pink-500 mt-2" aria-live="polite">
              Selected for message: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
          {hugStatus && (
            <p className={`text-xs mt-2 ${hugStatus.toLowerCase().includes('success') || hugStatus.toLowerCase().includes('sent') ? 'text-green-600' : 'text-red-600'}`} role="status">
              {hugStatus}
            </p>
          )}
          {kissStatus && (
            <p className={`text-xs mt-2 ${kissStatus.toLowerCase().includes('success') || kissStatus.toLowerCase().includes('sent') ? 'text-green-600' : 'text-red-600'}`} role="status">
              {kissStatus}
            </p>
          )}
        </div>
        
        {/* Main form submission status messages and button */}
        <div> 
          {isLoading && (
              <p className="text-pink-500 text-sm text-center mb-2" aria-live="polite">Sending your precious thoughts...</p>
          )}
          {isSent && !isLoading && (
            <p className="text-green-600 text-sm text-center mb-2" role="status">Your thoughts have been shared, my love. Thank you. ❤️</p>
          )}
          {error && !isLoading && (
              <p className="text-red-600 text-sm text-center mb-2" role="alert">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-transform transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={(submission.trim() === '' && !selectedFile) || isLoading || isSendingHug || isSendingKiss}
          >
            <SendIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Sending...' : 'Send With Love'}
          </button>
        </div>
      </form>
      <p className="mt-6 sm:mt-8 text-center text-xs text-gray-400">
        All submissions are confidential and shared only with ME! Your trust is MY priority.
      </p>
    </div>
  );
};

export default SubmissionForm;