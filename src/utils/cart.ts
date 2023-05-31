export const getCartOrderString = (orderItems: string[]) =>
	`${JSON.stringify(orderItems, null, 2)}`.replace(/\[|\]|"/g, '');
