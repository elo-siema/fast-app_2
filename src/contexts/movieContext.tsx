/* eslint-disable @typescript-eslint/ban-types */
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Movie } from '../models/movie';
import { MovieShowcase } from '../models/movieShowcase';
import { UserReservation } from '../models/userReservation';
import { AuthContext } from './authContext';

export interface MovieContext {
  movies?: Movie[];
  makeReservation: (movieShowcase: MovieShowcase) => Promise<unknown>;
  getReservations: () => Promise<UserReservation[] | undefined>;
}

export const MovieContext = createContext<MovieContext>({
  makeReservation: (movieShowcase: MovieShowcase) => Promise.resolve(),
  getReservations: async () => Promise.resolve(undefined),
});

export const MovieContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch('https://localhost:44386/api/1.0/movies');

      if (response.ok) {
        const responseMovies = (await response.json()) as Movie[];
        setMovies(responseMovies);
      }
    })();
  }, []);

  const makeReservation = async (movieShowcase: MovieShowcase) => {
    await fetch('https://localhost:44386/api/1.0/reservations', {
      method: 'POST',
      body: JSON.stringify({ movieShowcaseId: movieShowcase.id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    });
  };

  const getReservations = async () => {
    const response = await fetch('https://localhost:44386/api/1.0/reservations', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.ok) {
      const reservationsResponse = (await response.json()) as UserReservation[];
      return reservationsResponse;
    }
    return undefined;
  };

  return <MovieContext.Provider value={{ movies, makeReservation, getReservations }}>{children}</MovieContext.Provider>;
};
