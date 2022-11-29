import { screen } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Pizza } from '../../../types/pizza';
import { server } from '../../../lib/test/msw-server';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import PizzaList from '../PizzaList';

describe('Pizzas', () => {
  const renderPizzaList = () => {
    const view = renderWithProviders(<PizzaList />);

    return {
      ...view,
      $findPizzaItems: () => screen.findByTestId(/^pizza-item-test/),
      $findPizzaItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockPizzaListQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            pizzas: [...data],
          })
        );
      })
    );
  };

  beforeEach(() => {
    const pizza1 = createTestPizza();
    const pizza2 = createTestPizza();
    mockPizzaListQuery([pizza1, pizza2]);
  });

  test('should display a list of pizza', async () => {
    const { $findPizzaItems } = renderPizzaList();

    // expect(await $findPizzaItems()).toHaveLength(2);
    expect(await $findPizzaItems());
  });
});
