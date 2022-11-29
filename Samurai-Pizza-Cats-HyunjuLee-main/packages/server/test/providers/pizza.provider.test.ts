import { Collection } from 'mongodb';
import { reveal, stub } from 'jest-auto-stub';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument } from '../helpers/pizza.helper';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { ToppingDocument } from '../../src/entities/topping';
import { createMockToppingDocument } from '../../test/helpers/topping.helper';
import { CursorProvider } from '../../src/application/providers/cursors/cursor.provider';

const stubToppingCollection = stub<Collection<ToppingDocument>>();
const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubCursorCollection = stub<Collection<PizzaDocument>>();

const toppingProvider = new ToppingProvider(stubToppingCollection);
const cursorProvider = new CursorProvider(stubCursorCollection);
const pizzaProvider = new PizzaProvider(stubPizzaCollection, toppingProvider, cursorProvider);

const CursorResultsInput = {
  limit: 0,
  cursor: 'test',
};

beforeEach(jest.clearAllMocks);

describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);

  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).find.mockImplementation(mockSortToArray([mockPizzaDocument]));
    });
    test('should call find once', async () => {
      await pizzaProvider.getPizzas(CursorResultsInput);

      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all pizzas', async () => {
      const result = await pizzaProvider.getPizzas(CursorResultsInput);

      //test needed
      expect(result.results).toEqual([mockPizza]);
    });
  });

  describe('createPizza', (): void => {
    const validTopping = createMockToppingDocument({ name: 'test topping', priceCents: 250 });
    const validPizza = createMockPizzaDocument({
      name: 'test pizza',
      description: 'test pizza desc',
      imgSrc: 'testImg',
      toppings: [],
      toppingIds: validTopping.id,
    });
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
      reveal(stubToppingCollection).find.mockImplementation(mockSortToArray([validTopping]));
    });
    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });
      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza({
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });
      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  describe('deletePizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(mockPizza.id);
      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));
      await expect(pizzaProvider.deletePizza(mockPizza.id)).rejects.toThrow(new Error('Could not delete the pizza'));
    });
    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(mockPizza.id);
      expect(result).toEqual(mockPizza.id);
    });
  });

  describe('updatePizza', (): void => {
    const validTopping = createMockToppingDocument({ name: 'test topping', priceCents: 250 });
    const validPizza = createMockPizzaDocument({
      name: 'updated pizza',
      description: 'updated pizza desc',
      imgSrc: 'updatedImg',
      toppingIds: validTopping.id,
    });

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
      reveal(stubToppingCollection).find.mockImplementation(mockSortToArray([validTopping]));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });
      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a pizza', async () => {
      const result = await pizzaProvider.updatePizza({
        id: validPizza.id,
        name: validPizza.name,
        description: validPizza.description,
        imgSrc: validPizza.imgSrc,
        toppingIds: validPizza.toppingIds,
      });
      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });
});
