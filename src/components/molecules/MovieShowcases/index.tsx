import React, { FC, useContext, useState } from 'react';
import { MovieShowcase } from '../../../models/movieShowcase';
import { parseISO, format } from 'date-fns';
import './movieshowcases.css';
import { AuthContext } from '../../../contexts/authContext';
import { MovieContext } from '../../../contexts/movieContext';

interface MovieShowcasesProps {
  showcases?: MovieShowcase[];
}

export const MovieShowcases: FC<MovieShowcasesProps> = ({ showcases }) => {
  const [selectedShowcaseId, setSelectedShowcaseId] = useState<string | undefined>(
    showcases ? showcases[0]?.id : undefined
  );
  const { isLoggedIn } = useContext(AuthContext);
  const { makeReservation } = useContext(MovieContext);

  const onSelectChange = (id: string) => () => {
    setSelectedShowcaseId(id);
  };

  const onReserveClick =  () => {
    const showcase = showcases?.find(x => x.id == selectedShowcaseId);
    if(showcase) {
      makeReservation(showcase);
    }
  }

  return (
    <section>
      {showcases && showcases.length && (
        <fast-select value={selectedShowcaseId}>
          {showcases.map((x) => (
            <fast-option selected={selectedShowcaseId === x.id} key={x.id} value={x.id} onClick={onSelectChange(x.id)}>
              {`${format(parseISO(x.date), 'dd.MM.yyyy hh:mm')}`}
            </fast-option>
          ))}
        </fast-select>
      )}
      {isLoggedIn() && <fast-button
        appearance='accent'
        onClick={onReserveClick}
        {...(selectedShowcaseId ? {} : { disabled: true })}
        style={{ marginLeft: '1rem' }}
      >
        Rezerwuj
      </fast-button>}
    </section>
  );
};
