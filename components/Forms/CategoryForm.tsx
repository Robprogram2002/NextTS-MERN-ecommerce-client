/* eslint-disable no-unused-vars */
import { FormEvent } from 'react';
import { useAppSelector } from '../../hooks/redux_hooks';

interface CategoryFormProps {
  handleSubmit: (e: FormEvent) => void;
  name: string;
  setName: (value: string) => void;
}

const CategoryForm = ({ handleSubmit, name, setName }: CategoryFormProps) => {
  const { loading } = useAppSelector((state) => state.appState);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <br />
        <button type="submit" className="btn btn-outline-primary">
          {loading ? 'loading ...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
