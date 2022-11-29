import { pizzaProvider } from '../providers';
import { CursorResultsInput } from '../providers/cursors/cursor.provider.types';
import {
  CreatePizzaInput,
  DeletePizzaInput,
  UpdatePizzaInput,
  Pizza as SchemaPizza,
  GetPizzaResult,
} from '../schema/types/schema';
import { Root } from '../schema/types/types';

export type Pizza = Omit<SchemaPizza, 'toppings' | 'priceCents'> & {
  toppingIds: string[];
};

const pizzaResolver = {
  Query: {
    pizzas: async (_: Root, args: { input?: CursorResultsInput }): Promise<GetPizzaResult> => {
      const cursor: string = args.input?.cursor !== undefined ? args.input.cursor : 'test';
      const limit: number = args.input?.limit !== undefined ? args.input.limit : 0;
      const result = await pizzaProvider.getPizzas({
        limit: limit,
        cursor: cursor,
      });
      return result;
    },
  },

  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.createPizza(args.input);
    },

    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },

    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.updatePizza(args.input);
    },
  },
};

export { pizzaResolver };
