import 'bootstrap/dist/css/bootstrap.min.css';
import React, { ChangeEvent, FormEvent } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { Thread } from '../../types/CommonTypes';

interface EditThreadFormProps {
  thread: Thread;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setTempContent: React.Dispatch<React.SetStateAction<string>>;
  tempContent: string;
}

const EditThreadForm: React.FC<EditThreadFormProps> = ({
  thread,
  setIsEditing,
  setTempContent,
  tempContent,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [response, error, loading, axiosFetch] = useAxiosFunction();

  const handleEditChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'content') {
      setTempContent(value);
    }
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axiosFetch({
      method: 'PUT',
      url: `/api/v1/threads/${thread.id}`,
      // TODO: change hardcoded values once we get user API running
      data: {
        content: tempContent,
      },
    }).then(() => {
      setIsEditing(false);
      setTempContent(tempContent);
    });
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <textarea
        id='content'
        name='content'
        rows={5}
        placeholder='Text (required)'
        value={tempContent}
        onChange={handleEditChange}
        className='form-control my-2 thread-content'
        maxLength={40000}
        required
      />
      <button className='btn btn-sm btn-primary' type='submit'>
        Done
      </button>
    </form>
  );
};

export default EditThreadForm;
