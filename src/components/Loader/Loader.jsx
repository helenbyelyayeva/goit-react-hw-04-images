import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <ColorRing
        type="Puff"
        color="#47acce"
        height={350}
        width={350}
        timeout={3000}
      />
    </div>
  );
}
