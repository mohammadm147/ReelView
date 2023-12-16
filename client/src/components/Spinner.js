import React from 'react';
import styles from '../style';

// Spinner component
const Spinner = () => {
  return (
    <div className={`flex items-center justify-center ${styles.marginY}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500 border-solid"></div>
    </div>
  );
};

export default Spinner;