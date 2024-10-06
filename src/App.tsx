import React, { useState, useEffect } from 'react'
import { Coffee, ChevronDown, ChevronUp } from 'lucide-react';
import { rfcContent } from './RfcContent';
import ThemeToggle from './ThemeToggle';

function App() {
  const [isRfcExpanded, setIsRfcExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl w-full mb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Coffee className="text-brown-600 dark:text-brown-400 w-12 h-12 mr-4" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">HTTP 418: I'm a Teapot</h1>
          </div>
          <ThemeToggle />
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          When servers decide to become teapots, you get HTTP 418.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We never decided to be a teapot, we simply got assigned this number.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2">In the Wild</h2>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
          <code className="text-sm text-gray-800 dark:text-gray-200">
            HTTP/1.1 418 I'm a teapot<br />
            Content-Type: text/plain<br />
            <br />
            I'm a teapot
          </code>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-2xl w-full mb-4">
        <button
          onClick={() => setIsRfcExpanded(!isRfcExpanded)}
          className="flex items-center justify-between w-full text-left text-gray-800 dark:text-gray-200"
        >
          <span className="text-lg font-semibold">View RFC</span>
          {isRfcExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {isRfcExpanded && (
          <div className="mt-4 rfcmarkup flex justify-center">
            <pre className="max-w-3xl text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: rfcContent }} />
          </div>
        )}
      </div>

      <footer className="text-center text-gray-600 dark:text-gray-400 text-sm">
        <a href="https://codeword.info" target="_blank" rel="noopener" className="hover:text-gray-800 dark:hover:text-gray-200 underline">
          codeword.info
        </a>
      </footer>
    </div>
  )
}

export default App