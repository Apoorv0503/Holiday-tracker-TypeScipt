// src/components/HolidayForm.tsx
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import styles from "./HolidayForm.module.css";

interface HolidayFormProps {
  onSearch: (country: string) => void;
}

const HolidayForm: React.FC<HolidayFormProps> = ({ onSearch }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<string[]>(
          "https://public-holidays-buildout-backend.onrender.com/countries"
        );

        // handle the response
        if (response && response.data) {
              // console.log("fethced countries: ",response.data);
              setCountries(response.data);
            } 
        else {
              console.log('No data received from API');
          }

        //store one country in a state
        if (response && response.data && response.data.length > 0) {
          setCountry(response.data[0]);
        }
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);


  // .then(response => {
  //   if (response.data) {
  //     setCountries(response.data);
  //   } else {
  //     console.error('No data received from API');
  //   }
  // })
  // .catch(error => {
  //   console.error('Error fetching countries:', error);
  // });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(country);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setCountry(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <select
        value={country}
        onChange={handleCountryChange}
        className={styles.select}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <button type="submit" className={styles.button}>
        Fetch Holidays
      </button>
    </form>
  );
};

export default HolidayForm;
