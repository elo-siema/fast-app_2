import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';
import { Input } from '../../atoms/Input';
import { Logo } from '../../atoms/Logo';
import './header.css';

export const Header: FC = () => {
  const { isLoggedIn, login: loginAction, user } = useContext(AuthContext);
  const [isPopupOpen, setisPopupOpen] = useState(false);
  const [login, setLogin] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const onButtonClick = () => {
    setisPopupOpen(!isPopupOpen);
  };

  const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLogin(value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onLoginClick = async () => {
    try {
      setIsLoading(true);
      const user = await loginAction(login ?? '', password ?? '');
      if (!user) {
        setError('Nieprawidłowa nazwa użytkownika lub hasło');
        return;
      }
      setisPopupOpen(false);
    } catch (err) {
      setError('Coś poszło nie tak, spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header>
      <div className='header-inner'>
        {!isLoggedIn() ? (
          <fast-button onClick={onButtonClick} appearance='accent'>
            Zaloguj się
          </fast-button>
        ) : (
          <>
            {user?.roles?.find((x) => x == 'Administrator') && <Link to='add-movie'>
              <fast-button>Dodaj film</fast-button>
            </Link>}
            <Link to='/reservations'>
              <fast-button appearance='accent'>Moje rezerwacje</fast-button>
            </Link>
            &nbsp;Cześć&nbsp;{user?.firstName}&nbsp;&nbsp;&nbsp;
          </>
        )}
        {isPopupOpen && (
          <section className='login-popup'>
            {isLoading ? (
              <fast-progress-ring appearance='accent'></fast-progress-ring>
            ) : (
              <>
                <Input onChange={onLoginChange} autoComplete='off' />
                <Input onChange={onPasswordChange} type='password' autoComplete='off' />
                {error}
                <fast-button onClick={onLoginClick}>Zaloguj</fast-button>
              </>
            )}
          </section>
        )}
      </div>
      <Logo />
    </header>
  );
};
