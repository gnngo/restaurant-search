import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilterRestaurants] = useState(restaurants);
  
  useEffect(() => { 
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRestaurants(users));
  }, []);

  useEffect(() => {
    const newFilteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.name.toLocaleLowerCase().includes(searchField);
  });
    setFilterRestaurants(newFilteredRestaurants);
  },[restaurants, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className='app-title'> Restaurant </h1>

        <SearchBox 
          className='restaurant-search-box'
          onChangeHandler={onSearchChange} 
          placeholder='Search Name' 
        />

        <CardList restaurants={filteredRestaurants} />
    </div>
  );
}

export default App;
