
import React, { useState } from 'react';
import { GroupIcon, SendIcon } from '../constants';

interface SubmissionFormProps {
  loggedInUser: string;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ loggedInUser }) => {
  const [submission, setSubmission] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submission.trim() === '') return;

    setIsLoading(true);
    setError(null);
    setIsSent(false);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ***** TEMPORARY SIMULATION FOR MISSING BACKEND *****
    // When your backend API at '/api/send-email' is ready,
    // uncomment this block and remove the simulation code below.
    try {
      // Construct the full URL for the API endpoint
      const apiUrl = `${window.location.origin}/api/send-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: submission, loggedInUser: loggedInUser }),
      });

      if (!response.ok) {
        // Try to parse error from backend if available
        let errorMsg = `Our message bird seems to have hit a snag (HTTP ${response.status}). Please try again.`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
        } catch (parseError) {
            // Fallback if error response is not JSON
        }
        throw new Error(errorMsg);
      }

      // Assuming backend responds with success:true or similar
      // const result = await response.json(); 

      setIsSent(true);
      setSubmission('');
      setTimeout(() => setIsSent(false), 4000); // Reset message after 4 seconds
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again, my love.');
      }
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-xl w-full max-w-lg transform transition-all duration-500 hover:shadow-2xl">
      <div className="flex flex-col items-center mb-8">
         <div className="p-3 bg-pink-100 rounded-full mb-4">
          <GroupIcon className="w-12 h-12 text-pink-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-pink-600 mb-2 text-center">Share Your Heart</h1>
        <p className="text-center text-gray-500 text-sm max-w-md">
          Dearest, this is our special place. Feel free to share anything that's on your mind. Your words help our love blossom.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          placeholder="Pour your heart out here, my love..."
          rows={6}
          className="w-full p-4 bg-white border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none sm:text-sm transition-colors placeholder-gray-400 text-gray-700"
          disabled={isLoading}
        />
        
        {isLoading && (
            <p className="text-pink-500 text-sm mt-3 text-center">Sending your precious thoughts...</p>
        )}
        {isSent && !isLoading && (
          <p className="text-green-500 text-sm mt-3 text-center">Your thoughts have been shared, my love. Thank you. ❤️</p>
        )}
        {error && !isLoading && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-transform transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={submission.trim() === '' || isLoading}
        >
          <SendIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Sending...' : 'Send With Love'}
        </button>
      </form>
      <p className="mt-8 text-center text-xs text-gray-400">
        All submissions are confidential and shared only with your partner. Your trust is our priority.
      </p>
    </div>
  );
};

export default SubmissionForm;
