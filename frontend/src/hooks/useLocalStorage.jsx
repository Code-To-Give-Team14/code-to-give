import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      // Get the value from localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error getting value from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // Save the value to localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving value to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;