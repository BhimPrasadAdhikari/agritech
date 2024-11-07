import { Orderitem } from "@/types";
import OrderProductItem from "./orderProduct-item";

interface OrderProductProps {
  data: Orderitem[];
}

const OrderProduct: React.FC<OrderProductProps> = ({ data }) => {
  return (
    <>
      <div>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <OrderProductItem
                data={item.productId}
                quantity={item.quantity}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default OrderProduct;
