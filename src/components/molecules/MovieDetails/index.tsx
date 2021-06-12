import { FC, PropsWithChildren } from 'react';
import { Movie } from '../../../models/movie';
import { Category } from '../../atoms/Category';
import { TeaserImage } from '../../atoms/TeaserImage';
import { Title } from '../../atoms/Title';
import { MovieShowcases } from '../MovieShowcases';
import './moviedetails.css';

type MovieDetailsProps = {} & Movie;

export const MovieDetails: FC<PropsWithChildren<MovieDetailsProps>> = ({
  name,
  description,
  movieCategory,
  imageUrl,
  showcases,
  children,
}) => {
  return (
    <article className='movie'>
      <div className='movie-wrapper'>
        <aside>
          <Title>{name}</Title>
          <Category category={movieCategory} />
          <p>{description}</p>
          <MovieShowcases showcases={showcases} />
          {children}
        </aside>
        <aside>
          <TeaserImage imageUrl={imageUrl} />
        </aside>
      </div>
    </article>
  );
};
