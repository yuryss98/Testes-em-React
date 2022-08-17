import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testando o componente App', () => {
  it('verificando se a app tem 3 links no topo', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar
    no link Home da barra de navegação;`, () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });

    userEvent.click(homeLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na URL /about, ao
    clicar no link About da barra de navegação;`, () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL
    /favorites, ao clicar no link Favorite Pokémons da barra de navegação;`, () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoriteLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma
    URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/desconhecido');
    const { location: { pathname } } = history;

    expect(pathname).toBe('/desconhecido');

    const notFoundTitle = screen.getByRole('heading', { level: 2, name: /Page/i });
    const notFoundImage = screen.getByRole('img', { name: /Pikachu crying/i });

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();
  });

  it('tesntado input de favoritar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const title = screen.getByRole('heading', { level: 2, name: /Pikachu Details/i });
    expect(title).toBeInTheDocument();

    const btnFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(btnFavorite);
    userEvent.click(btnFavorite);
  });
});
