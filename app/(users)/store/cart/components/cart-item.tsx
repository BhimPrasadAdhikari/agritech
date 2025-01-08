import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { X } from "lucide-react";

interface CartItemProps {
  data: {
    id: string;
    name: string;
    description: string;
    discount: number;
    images: { url: string }[];
    ratings: { rating: number }[];
    price: number;
    discountedPrice: number;
    category: string;
    subCategory: string;
    productSpecifications: { name: string; value: string }[];
  };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex flex-col sm:flex-row py-6 border-b ">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton
            className="    "
            onClick={onRemove}
            icon={<X size={15} />}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black ">
              {data.name}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
           
          </div>
          <Currency value={data.price} />
        </div>
        <div className="flex gap-14 flex-wrap w-full">
          <div>
            <div className="text-sm text-yellow-400">
              <span className="text-sm text-gray-500">Total Price :</span>{" "}
              <Currency
                value={
                  data.price-
                  ((data.price * data.discount) / 100)
                }
              />
              <span className="line-through text-yellow-900">
                {" "}
                <Currency value={data.price} />
              </span>
            </div>
            <span className="text-sm text-pink-500 animate-pulse">
              {" "}
              wow! save upto{" "}
              <Currency
                value={data.price * (data.discount / 100)}
              />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
