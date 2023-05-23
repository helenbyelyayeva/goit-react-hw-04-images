import propTypes from 'prop-types';
import { useState } from 'react';
import css from "./Searchbar.module.css";
import { FaSearch } from 'react-icons/fa';



export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ query });
        setQuery('');
    };

    return (
        <header className={css.header}>
            <form className={css.search_form} onSubmit={handleSubmit}>
                <button className={css.search_btn} type="submit" >
                    <FaSearch />
                </button>
                <input
                    name="query"
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.currentTarget.value.toLowerCase())}
                    className={css.search_input}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photo..."
                />
            </form>
        </header>
    );

}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,
};
