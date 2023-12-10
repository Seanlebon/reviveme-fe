import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../apis/reviveme';
import './EditThreadButton.css';

const EditThreadButton = ({ isEditingCallback }) => {
  return (
    <div>
      <button className='btn btn-primary btn-sm' onClick={isEditingCallback}>
        Edit
      </button>
    </div>
  );
};

export default EditThreadButton;
