import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch all countries upon initial render
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch states when a country is selected
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          if (!response.ok) {
            throw new Error('Failed to fetch states');
          }
          const data = await response.json();
          setStates(data);
          setSelectedState('');
          setCities([]);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch cities when a state is selected
    const fetchCities = async () => {
      if (selectedState) {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          if (!response.ok) {
            throw new Error('Failed to fetch cities');
          }
          const data = await response.json();
          setCities(data);
          setSelectedCity('');
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setResult(`You selected ${event.target.value}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div>
      <h1>Location Selector</h1>
      <div>
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div>
          <label htmlFor="state">Select State:</label>
          <select id="state" value={selectedState} onChange={handleStateChange}>
            <option value="">Select</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      )}
      {selectedState && (
        <div>
          <label htmlFor="city">Select City:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}
      {result && <p>{result}</p>}
    </div>
  );
};

export default LocationSelector;
