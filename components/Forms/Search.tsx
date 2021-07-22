import { useState, FormEvent } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../hooks/redux_hooks';
import { filterActions } from '../../store/filter/filter_slice';

const Search = () => {
  const [text, setText] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(filterActions.setQuery(text));
    router.push(`/shop`);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setText(e.target.value)}
        type="search"
        value={text}
        style={{ width: '300px' }}
        className="form-control mr-sm-1"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  );
};

export default Search;
