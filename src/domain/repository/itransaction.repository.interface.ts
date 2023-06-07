export interface ITransactionRepository {
  findByReference(reference: string);
}

export const itransactionRepositoryToken = "i.transaction.repository";
