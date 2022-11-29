import { Topping } from './topping';

export interface Pizza {
  id: string;
  imgSrc: string;
  name: string;
  description: string;
  toppingIds: string[];
  toppings?: Topping[];
  priceCents?: number;
}
