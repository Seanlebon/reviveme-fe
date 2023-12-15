import React from 'react';
import './EditThreadButton.css';

interface EditThreadButtonProps {
  isEditingCallback: () => void;
}

const EditThreadButton: React.FC<EditThreadButtonProps> = ({
  isEditingCallback,
}) => {
  return (
    <div>
      <button className='btn btn-primary btn-sm' onClick={isEditingCallback}>
        Edit
      </button>
    </div>
  );
};

export default EditThreadButton;
