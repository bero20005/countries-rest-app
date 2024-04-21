import { useState, useEffect } from "react";
import { apiUrl } from "./until/Api";
import SearchInput from "./SearchInput";
import FilterCountry from "./FilterCountry";
import { Link } from "react-router-dom";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const getAllCountries = async () => {
        try {
            const res = await fetch(`${apiUrl}/all`);

            if (!res.ok) throw new Error("Failed to fetch countries");

            const data = await res.json();
            setCountries(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const getCountryByName = async (countryName) => {
        try {
            const res = await fetch(`${apiUrl}/name/${countryName}`);

            if (!res.ok) throw new Error("Country not found");

            const data = await res.json();
            setCountries(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const getCountryByRegion = async (regionName) => {
        try {
            const res = await fetch(`${apiUrl}/region/${regionName}`);

            if (!res.ok) throw new Error("Failed to fetch countries by region");

            const data = await res.json();
            setCountries(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <div className="all__country__wrapper">
            <div className="country__top">
                <div className="search">
                    <SearchInput onSearch={getCountryByName} />
                </div>
                <div className="filter">
                    <FilterCountry onSelect={getCountryByRegion} />
                </div>
            </div>

            <div className="country__bottom">
                {isLoading && !error && <h4>Loading...</h4>}
                {error && !isLoading && <h4>{error}</h4>}
                {countries.length === 0 && !isLoading && !error && <h4>No countries found</h4>}

                {countries.map((country) => (
                    <Link to={`/country/${country.name.common}`}>
                        <div className="country__card" key={country.cca3}>
                        <div className="country__img">
                            <img src={country.flags.png} alt="" />
                        </div>

                        <div className="country__data">
                            <h3>{country.name.common}</h3>
                            <h6>{" "} Population:{" "} 
                            {new Intl.NumberFormat().format(country.population)}</h6>
                            <h6>Region: {country.region}</h6>
                            <h6>Capital: {country.capital}</h6>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Countries;
