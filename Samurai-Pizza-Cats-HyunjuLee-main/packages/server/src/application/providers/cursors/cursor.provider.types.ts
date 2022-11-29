import { ObjectId } from 'mongodb';
import { Pizza } from '../pizzas/pizza.provider.types';

export interface GetPizzaResult {
  results: Pizza[];
  cursor?: string;
  hasNextPage: boolean;
  totalCount?: number | null;
}

export interface CursorResultsInput {
  limit: number;
  cursor: string;
}
