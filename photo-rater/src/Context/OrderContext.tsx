import { createContext } from 'react';

const OrderContext = createContext({
    order: "",
    setOrder: (ordr: string) => {}
})

export default OrderContext;