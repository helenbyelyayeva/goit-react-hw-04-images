import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
    return (
        <button type="button" className={css.load_more} onClick={onLoadMore}>
            Load more
        </button>
    );
};