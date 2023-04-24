// Una transaction es duplicada, si tiene el mismo sourceAccount, targetAccount, category, amount y el tiempo es menor a 1 minuto de diferencia.

// Hacer una funcionalidad que agrupe las transaccciones duplicadas
// en una lista.

// Ejemplo:

const exampleOutput = [
  [
    {
      id: 1,
      sourceAccount: 'A',
      targetAccount: 'B',
      amount: 100,
      category: 'eating_out',
      time: '2018-03-02T10:33:00.000Z',
    },
    {
      id: 2,
      sourceAccount: 'A',
      targetAccount: 'B',
      amount: 100,
      category: 'eating_out',
      time: '2018-03-02T10:33:50.000Z',
    },
    {
      id: 3,
      sourceAccount: 'A',
      targetAccount: 'B',
      amount: 100,
      category: 'eating_out',
      time: '2018-03-02T10:34:30.000Z',
    },
  ],
  [
    {
      id: 5,
      sourceAccount: 'A',
      targetAccount: 'C',
      amount: 250,
      category: 'other',
      time: '2018-03-02T10:33:00.000Z',
    },
    {
      id: 6,
      sourceAccount: 'A',
      targetAccount: 'C',
      amount: 250,
      category: 'other',
      time: '2018-03-02T10:33:05.000Z',
    },
  ],
];

const transactions = [
  {
    id: 3,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:34:30.000Z',
  },
  {
    id: 100,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:34:50.000Z',
  },
  {
    id: 200,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:35:50.000Z',
  },
  {
    id: 1,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:33:00.000Z',
  },
  {
    id: 6,
    sourceAccount: 'A',
    targetAccount: 'C',
    amount: 250,
    category: 'other',
    time: '2018-03-02T10:33:05.000Z',
  },
  {
    id: 4,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:37:00.000Z',
  },
  {
    id: 2,
    sourceAccount: 'A',
    targetAccount: 'B',
    amount: 100,
    category: 'eating_out',
    time: '2018-03-02T10:33:50.000Z',
  },
  {
    id: 5,
    sourceAccount: 'A',
    targetAccount: 'C',
    amount: 250,
    category: 'other',
    time: '2018-03-02T10:33:00.000Z',
  },
];

function groupDuplicateTransactions(transactions) {
  const sortedTransactions = transactions
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .sort((a, b) => (a.category > b.category ? 1 : -1));

  const duplicatedTransactions = [];
  let previousExist = false;

  for (let i = 1; i < sortedTransactions.length; i++) {
    const currentTransaction = sortedTransactions[i];
    const previousTransaction = sortedTransactions[i - 1];

    if (
      currentTransaction.sourceAccount === previousTransaction.sourceAccount &&
      currentTransaction.targetAccount === previousTransaction.targetAccount &&
      currentTransaction.category === previousTransaction.category &&
      currentTransaction.amount === previousTransaction.amount &&
      Math.abs(
        new Date(currentTransaction.time).getTime() -
          new Date(previousTransaction.time).getTime()
      ) < 60000
    ) {
      if (!previousExist) {
        duplicatedTransactions.push(previousTransaction);
        previousExist = true;
      }
      duplicatedTransactions.push(currentTransaction);
    } else {
      previousExist = false;
    }
  }

  return duplicatedTransactions;
}

console.log(groupDuplicateTransactions(transactions));
