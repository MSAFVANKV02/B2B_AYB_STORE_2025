export type IOrders = {
    orderCode: string;
    store: string;
    numOfProducts: number;
    customer: string;
    amount: string;
    deliveryStatus: string;
    paymentMethod: string;
    paymentStatus: string;
    refund: string;
    createdAt: string;
    returnType: IReturnTypes;
  };
  

 export type IReturnTypes = "all" | "replace" | "refund";