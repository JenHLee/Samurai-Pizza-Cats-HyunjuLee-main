import { setupDb } from '../database';

import { ToppingProvider } from './toppings/topping.provider';
import { PizzaProvider } from './pizzas/pizza.provider';
import { CursorProvider } from './cursors/cursor.provider';

const db = setupDb();

const toppingProvider = new ToppingProvider(db.collection('toppings'));
const cursorProvider = new CursorProvider(db.collection('pizzas'));
const pizzaProvider = new PizzaProvider(db.collection('pizzas'), toppingProvider, cursorProvider);

export { toppingProvider, pizzaProvider };
