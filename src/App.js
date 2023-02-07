// import { useState, useEffect } from 'react';
// import CardList from './components/card-list/card-list.component';
// import SearchBox from './components/search-box/search-box.component';
// import './App.css';

// const App = () => {
//   const [searchField, setSearchField] = useState('');
//   const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilterRestaurants] = useState([]);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?name=${searchField}`
//       );
//       const data = await response.json();
//       setRestaurants(data);
//       console.log(data);
//     };
//     fetchData();
//   }, [searchField]);

//   useEffect(() => {
//     const newFilteredRestaurants = restaurants.filter(restaurant => {
//       return restaurant.Name.toLocaleLowerCase().includes(searchField);
//     });
//     setFilterRestaurants(newFilteredRestaurants);
//     setNotFound(newFilteredRestaurants.length === 0 && searchField !== '');
//   }, [restaurants, searchField]);

//   const onSearchChange = event => {
//     const searchFieldString = event.target.value.toLocaleLowerCase();
//     setSearchField(searchFieldString);
//   };

//   return (
//     <div className="App">
//       <h1 className="app-title">Restaurant</h1>
//       <SearchBox
//         className="restaurant-search-box"
//         onChangeHandler={onSearchChange}
//         placeholder="Search Name"
//       />
//       {notFound ? (
//         <h2>Restaurant cannot be found</h2>
//       ) : (
//         <CardList restaurants={filteredRestaurants} />
//       )}
//     </div>
//   );
// };

// export default App;
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [selectedOption, setSelectedOption] = useState('name'); // default selected option is name
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilterRestaurants] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      if (selectedOption === 'name') {
        url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?name=${searchField}`;
      } else {
        url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?cuisine=${searchField}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data);
      console.log(data);
    };
    fetchData();
  }, [searchField, selectedOption]);

  useEffect(() => {
    const newFilteredRestaurants = restaurants.filter(restaurant => {
      return selectedOption === 'name'
        ? restaurant.Name.toLocaleLowerCase().includes(searchField)
        : restaurant.Cuisine.toLocaleLowerCase().includes(searchField);
    });
    setFilterRestaurants(newFilteredRestaurants);
    setNotFound(newFilteredRestaurants.length === 0 && searchField !== '');
  }, [restaurants, searchField, selectedOption]);

  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="app-title">Restaurant</h1>
      <select value={selectedOption} onChange={onOptionChange}>
        <option value="name">Name</option>
        <option value="cuisine">Cuisine</option>
      </select>
      <SearchBox
        className="restaurant-search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search"
      />
      {notFound ? (
        <h2>Restaurant cannot be found</h2>
      ) : (
        <CardList restaurants={filteredRestaurants} />
      )}
    </div>
  );

};

export default App;


