import { Document } from 'mongodb';
import { Pizza } from '../application/providers/pizzas/pizza.provider.types';
// import {Pizza} from '../application/schema/types/schema";

// data from mongodb -> use pizza.provider
// _id = objectID ->  chagne to string to use

interface PizzaDocument extends Document, Omit<Pizza, 'id'> {}

//PizzaDocument's type
const toPizzaObject = (pizza: PizzaDocument): Pizza => {
  return {
    id: pizza._id.toHexString(),
    name: pizza.name,
    description: pizza.description,
    imgSrc: pizza.imgSrc,
    toppingIds: pizza.toppingIds,
    toppings: pizza.toppings,
  };
};

export { PizzaDocument, toPizzaObject };
