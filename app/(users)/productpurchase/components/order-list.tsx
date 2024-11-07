

import Container from '@/components/ui/container';
import OrderItem from './order-item';
import Summary from './summary';
import { useEffect, useState } from 'react';
import { Order } from '@/types';
interface OrderListProps{
    orders:Order[];
    paymentStatus: string;
}
const OrderList:React.FC<OrderListProps> = ({
   orders,
   paymentStatus
}) => {
  const [filteredOrders,setFilterOrders]=useState<Order[]>([])
  useEffect(()=>{
    const filteredOrders = orders.filter((order)=>order.paymentStatus.toLowerCase()===paymentStatus.toLowerCase())
     setFilterOrders(filteredOrders);
  },[paymentStatus,orders])
  return (
   <><div className="bg-white dark:bg-black p-5">
      <Container>
              {filteredOrders.length === 0 && <p className="text-neutral-500">No orders</p>}
                 {filteredOrders.map((item) => (
                   <OrderItem key={item.id} data={item} />
                ))}
      </Container>
    </div>
{/* <Summary orders={orders}/> */}
    </> 
  )
};

export default OrderList;