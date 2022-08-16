import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('testando componente NotFound', () => {
  it(`Teste se a página contém um heading h2 com o texto Page
    requested not found;`, () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', { level: 2, name: /Page requested not/i });

    expect(title).toBeInTheDocument();
  });

  it(`Teste se a página mostra a imagem
    https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    renderWithRouter(<NotFound />);

    const notFoundImage = screen.getByRole('img', { name: /Pikachu crying/i });

    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe(srcImg);
  });
});
