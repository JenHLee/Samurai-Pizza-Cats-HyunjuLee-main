import { gql } from 'apollo-server-core';

import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { pizzaProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from '../../src/application/schema/types/schema';

import { createMockPizza } from '../helpers/pizza.helper';
import { createMockPizzaCursorResult } from '../helpers/pizza.helper';
import { TestClient } from '../helpers/client.helper';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockPizza = createMockPizza();

const getPizzaResult = createMockPizzaCursorResult();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, pizzaResolver);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query getPizzas($input: CursorResultsInput) {
          pizzas(input: $input) {
            results {
              id
              imgSrc
              name
              toppingIds
              toppings {
                id
                name
              }
              priceCents
            }
            totalCount
            hasNextPage
            cursor
          }
        }
      `;
      test('should get all pizzas', async () => {
        jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue(getPizzaResult);
        const result = await client.query({ query });
        expect(result.data).toEqual({
          pizzas: {
            results: [
              {
                id: '6382a85e5c2a0bc1becc69f5',
                imgSrc:
                  'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
                name: 'Test',
                toppingIds: ['test'],
                toppings: [
                  {
                    id: 'test',
                    name: 'test',
                    __typename: 'Topping',
                  },
                ],
                priceCents: 100,
                __typename: 'Pizza',
              },
            ],
            totalCount: 1,
            hasNextPage: false,
            cursor: '',
            __typename: 'GetPizzaResult',
          },
        });

        expect(pizzaProvider.getPizzas).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            name
            description
            imgSrc
            toppings {
              id
              name
              priceCents
            }
            priceCents
          }
        }
      `;

      const validPizza = createMockPizza({
        name: 'test pizza',
        description: 'test pizza desc',
        imgSrc: 'testimg',
        toppings: [],
        toppingIds: [],
        priceCents: 600,
      });

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(validPizza);
      });

      test('should call create pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };

        await client.mutate({ mutation, variables });

        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return created pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppings: validPizza.toppings,
            priceCents: validPizza.priceCents,
          },
        });
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input)
        }
      `;

      const variables: MutationDeletePizzaArgs = { input: { id: mockPizza.id } };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(mockPizza.id);
      });

      test('should call deletePizza with id', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted pizza id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deletePizza: mockPizza.id,
        });
      });
    });

    describe('updatePizza', () => {
      const mutation = gql`
        mutation ($input: UpdatePizzaInput!) {
          updatePizza(input: $input) {
            id
            name
            description
            imgSrc
            toppings {
              id
              name
              priceCents
            }
            priceCents
          }
        }
      `;
      const updatedPizza = createMockPizza({
        name: 'updated pizza',
        description: 'updated pizza desc',
        imgSrc: 'updatedImg',
        toppingIds: [],
      });

      const variables: MutationUpdatePizzaArgs = {
        input: {
          id: mockPizza.id,
          name: updatedPizza.name,
          imgSrc: updatedPizza.imgSrc,
          toppingIds: updatedPizza.toppings,
        },
      };

      beforeEach(() => {
        jest.useFakeTimers('legacy').spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatedPizza);
      });

      test('should call updatePizza with input', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
      });

      test('should return updated pizza', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updatePizza: {
            __typename: 'Pizza',
            id: updatedPizza.id,
            name: updatedPizza.name,
            description: updatedPizza.description,
            imgSrc: updatedPizza.imgSrc,
            toppings: updatedPizza.toppings,
            priceCents: updatedPizza.priceCents,
          },
        });
      });
    });
  });
});
