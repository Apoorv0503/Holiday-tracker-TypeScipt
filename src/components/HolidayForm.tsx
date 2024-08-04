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

        console.log(response.data);
        setCountries(response.data);
        if (response.data.length > 0) {
          setCountry(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

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
