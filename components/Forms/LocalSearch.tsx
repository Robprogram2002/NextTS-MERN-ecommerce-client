import { ChangeEvent } from 'react';

interface LocalSearchProps {
  keyword: string;
  // eslint-disable-next-line no-unused-vars
  setKeyword: (value: string) => void;
}

const LocalSearch = ({ keyword, setKeyword }: LocalSearchProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

export default LocalSearch;
