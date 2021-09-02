import { Transaction, TransactionOptions } from 'sequelize';
import { sequelize } from './sequelize';

export function databaseTransaction<T>(callback: (t: Transaction) => Promise<T>): Promise<T>;
export function databaseTransaction(options?: TransactionOptions): Promise<Transaction>;

export function databaseTransaction(callback?: any): Promise<any> {
  return sequelize.transaction(callback);
}
