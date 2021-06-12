import { FC, useContext, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { MovieDetails } from '../components/molecules/MovieDetails';
import { MovieContext } from '../contexts/movieContext';
import { UserTemplate } from '../templates/UserTemplate';

interface MovieRouteMatch {
  movieId?: string;
}

export const Movie: FC = () => {
  const {
    params: { movieId },
  } = useRouteMatch<MovieRouteMatch>();
  const { movies } = useContext(MovieContext);
  const redirect = () => <Redirect to='/' />;
  if (!movieId) {
    return redirect();
  }

  const movie = movies?.find((x) => x.id == movieId);

  if (movie) {
    return (
      <UserTemplate>
        <MovieDetails {...movie}>
          
        </MovieDetails>
      </UserTemplate>
    );
  } else {
    return redirect();
  }
};
