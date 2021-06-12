import { FC, useContext } from 'react';
import { MovieContext } from '../contexts/movieContext';
import { MoviesGrid } from '../templates/MoviesGrid';
import { UserTemplate } from '../templates/UserTemplate';

export const Home: FC = () => {
  const { movies } = useContext(MovieContext);

  return (
    <UserTemplate>
      <MoviesGrid movies={movies}>
        <h1>Najnowsze filmy</h1>
      </MoviesGrid>
    </UserTemplate>
  );
};
