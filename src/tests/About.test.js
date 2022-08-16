import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../helper/renderWithRouter';

describe('testando o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragrafo1 = screen.getByText(/This application simulates a Pokédex/);
    const paragrafo2 = screen.getByText(/One can filter Pokémons by type/);

    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByRole('img', { name: 'Pokédex' });

    const srcIncompleto1 = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/';
    const srcIncompleto2 = 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const srcCompleto = `${srcIncompleto1}${srcIncompleto2}`;

    expect(pokedexImage.src).toBe(srcCompleto);
  });
});
