import Image from "next/image";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const item = cart.items.find((item) => item.id == data.id);
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex flex-col sm:flex-row py-6 border-b dark:text-white">
      <div className="relative h-20 w-20 rounded-md overflow-hidden">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black dark:text-white">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.size.name}</p>
          </div>
          <Currency value={data.price} />
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center">
          <span className="text-sm text-gray-500 mx-5">Quantity</span>
          <div className="flex items-center mt-2 sm:mt-0">
              <div>{item ? item.quantity : 1}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
