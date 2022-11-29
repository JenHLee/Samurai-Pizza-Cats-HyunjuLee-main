import { Topping } from '../toppings/topping.provider.types';
//from mongoDB show the data types
export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;

  toppings: Topping[];
  priceCents?: number | null;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: string[];
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  imgSrc?: string | null;
  toppingIds?: string[] | null;
}
