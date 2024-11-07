import getProduct from "@/actions/get-product";
import CarouselPluginOrder from "@/components/carousalPulginOrder";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import { useEffect, useState } from "react";

interface OrderProductItemProps {
  data: string;
  quantity: number;
}

const OrderProductItem: React.FC<OrderProductItemProps> = ({
  data,
  quantity,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(data); 
        setProduct(res);
      } catch (error) {
        console.error("ORDER_PRODUCT_ITEM_PRODUCT_FEETCH", error);
      }
    };
    fetchProduct();
  }, [data]);
  return (
    <div className="flex gap-10">
      <CarouselPluginOrder data={product ? product?.images : []} />
      <div className="relative pl-4 gap-3 sm:grid sm:grid-cols-2 sm:gap-x-6 md:pl-12">
        <div className="flex flex-col mb-4 sm:mb-0">
          <p className="text-neutral-400">Name</p>
          <p className="font-semibold">{product?.name}</p>
          <p className="text-wrap text-sm">{product?.detail}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-400">Color</p>
            <p className="font-semibold">{product?.color.name}</p>
          </div>
          <div>
            <p className="text-neutral-400">Size</p>
            <p className="font-semibold">{product?.size.name}</p>
          </div>
          <div>
            <p className="text-neutral-400">Price</p>
            <Currency value={product?.price} />
          </div>
          <div>
            <p className="text-neutral-400">Quantity</p>
            <p className="font-semibold mx-2">{quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderProductItem;
