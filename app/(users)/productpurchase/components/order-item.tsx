

import { Order } from "@/types";
import OrderProduct from "./order-product";


interface OrderItemProps {
  data: Order;
}
const OrderItem: React.FC<OrderItemProps> = ({
  data
}) => {
  return ( 
    <li className="flex py-6 border-b dark:text-white relative">
        <OrderProduct data={data.orderItems} />
    </li>
  );
}
 
export default OrderItem;