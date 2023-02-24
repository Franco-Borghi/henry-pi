import React from 'react';
import './SearchBar.scss';

function SearchBar({setSearchValue}) {

  const [value, setValue] = React.useState('');
  const handleClick = (val) => {
    setSearchValue(val);
    setValue('');
  }
  return (
    <label className='search-bar-component large-text'>
      <input onChange={(e) => setValue(e.target.value)} value={value} type="text" placeholder='Search...' />
      <button onClick={() => handleClick(value)} type='button'></button>
    </label>
  )
}

export { SearchBar };