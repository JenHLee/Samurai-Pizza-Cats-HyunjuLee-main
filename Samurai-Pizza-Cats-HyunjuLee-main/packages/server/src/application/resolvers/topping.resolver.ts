import { CreateToppingInput, DeleteToppingInput, Topping, UpdateToppingInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { toppingProvider } from '../providers';
// import { Pizza } from '../providers/pizzas/pizza.provider.types';

const toppingResolver = {
  Query: {
    toppings: async (): Promise<Topping[]> => {
      return toppingProvider.getToppings();
    },
  },

  // this Pizza is same as Pizza of schema.d.ts
  Pizza: {
    // to getToppingsByIds, Bring toppingIds of parent pizza and send to toppingProvider
    // toppings: async (parent: Pizza): Promise<Topping[]> => {
    toppings: async (pizza: { toppingIds: string[] }): Promise<Topping[]> => {
      return toppingProvider.getToppingsByIds(pizza.toppingIds);
    },
    // to get priceCents, bring toppingIds of parent pizza and send to toppingProvider
    priceCents: async (pizza: { toppingIds: string[] }): Promise<number> => {
      return toppingProvider.getPriceCents(pizza.toppingIds);
    },
  },

  Mutation: {
    createTopping: async (_: Root, args: { input: CreateToppingInput }): Promise<Topping> => {
      return toppingProvider.createTopping(args.input);
    },

    deleteTopping: async (_: Root, args: { input: DeleteToppingInput }): Promise<string> => {
      return toppingProvider.deleteTopping(args.input.id);
    },

    updateTopping: async (_: Root, args: { input: UpdateToppingInput }): Promise<Topping> => {
      return toppingProvider.updateTopping(args.input);
    },
  },
};

export { toppingResolver };
