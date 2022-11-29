import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Pizza, CreatePizzaInput, UpdatePizzaInput } from './pizza.provider.types';
import validateStringInputs from '../../../lib/string-validator';
import { ToppingProvider } from '../toppings/topping.provider';
import { CursorProvider } from '../cursors/cursor.provider';
import { CursorResultsInput, GetPizzaResult } from '../cursors/cursor.provider.types';

class PizzaProvider {
  constructor(
    private collection: Collection<PizzaDocument>,
    private toppingProvider: ToppingProvider,
    private cursorProvider: CursorProvider
  ) {}

  public async getPizzas(input?: CursorResultsInput): Promise<GetPizzaResult> {
    if (!input) {
      input = {
        cursor: 'test',
        limit: 0,
      };
    }

    const { cursor, limit } = input;
    if (cursor === 'test') {
      const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
      return {
        results: pizzas.map(toPizzaObject),
        totalCount: pizzas.length,
        hasNextPage: false,
        cursor: '',
      };
    } else {
      const { totalCount, hasNextPage, nextCursor, results } = await this.cursorProvider.getcursorResults({
        cursor: cursor,
        limit: limit,
      });
      return {
        results: results.map(toPizzaObject),
        totalCount: totalCount,
        hasNextPage: hasNextPage,
        cursor: nextCursor,
      };
    }

    if (cursor === 'default') {
      const pizzas = await this.collection.find().sort({ name: 1 }).limit(limit).toArray();
      const nextCursor = pizzas[limit - 1].id;
      return {
        results: pizzas.map(toPizzaObject),
        totalCount: pizzas.length,
        hasNextPage: false,
        cursor: nextCursor,
      };
    } else {
      const { totalCount, hasNextPage, nextCursor, results } = await this.cursorProvider.getcursorResults({
        cursor: cursor,
        limit: limit,
      });
      return {
        results: results.map(toPizzaObject),
        totalCount: totalCount,
        hasNextPage: hasNextPage,
        cursor: nextCursor,
      };
    }
  }

  public async validateToppings(toppingIds: string[]): Promise<void> {
    const toppings = await this.toppingProvider.getToppingsByIds(toppingIds);
    toppings.forEach((id) => {
      if (toppingIds.includes(id.id)) {
      } else {
        throw new Error('Topping could not be found');
      }
    });
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    if (input.name) validateStringInputs(input.name);
    if (input.toppingIds) await this.validateToppings(input.toppingIds);
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...input,
          toppingIds: input.toppingIds?.map((id) => new ObjectId(id)),
          updateAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} pizza`);
    }

    const pizza = data.value;
    return toPizzaObject(pizza);
  }

  public async deletePizza(id: string): Promise<string> {
    const pizzaId = new ObjectId(id);

    const pizzaData = await this.collection.findOneAndDelete({
      _id: pizzaId,
    });

    const pizza = pizzaData.value;

    if (!pizza) {
      throw new Error(`Could not delete the pizza`);
    }

    return id;
  }

  public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
    const { id, name, description, toppingIds, imgSrc } = input;
    if (name) validateStringInputs(name);
    if (toppingIds) await this.validateToppings(toppingIds);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(toppingIds && { toppingIds: toppingIds.map((id) => new ObjectId(id)) }),
        },
      },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }
}

export { PizzaProvider };
