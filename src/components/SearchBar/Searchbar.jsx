import propTypes from 'prop-types';
import { useState } from 'react';
import css from "./Searchbar.module.css";
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter some data');
            return;
        }
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
            <ToastContainer autoClose={2000} />
        </header>
    );

}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,
};
