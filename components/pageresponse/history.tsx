import React from 'react';

interface HistoryProps {
  name: string;
  onClick?: () => void;
  className?: string; // Adding className prop to the interface
}

const HistoryCard: React.FC<HistoryProps> = ({ name, onClick, className }) => {
  return (
    <div onClick={onClick}> {/* Using className prop */}
      <div className={`${className}  hover:bg-gray-200 px-3 py-3 font-semibold  rounded-xl`}>{name}</div>
    </div>
  );
}

export default HistoryCard;
