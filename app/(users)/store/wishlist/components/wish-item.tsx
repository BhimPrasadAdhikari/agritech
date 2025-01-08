"use client"
import Image from "next/image";
import { Expand, ShoppingCart, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useWish from "@/hooks/use-wish";
import useCart from '@/hooks/use-cart';
import { MouseEventHandler } from "react";
import usePreviewModel from "@/hooks/use-preview-modal";


interface WishItemProps {
  data: {
  id:string,
  name:string,
  description:string,
  discount:number,
  images:{url:string}[],
  ratings:{rating:number}[],
  price:number,
  discountedPrice:number,
  category:string,
  subCategory:string,
  productSpecifications:{name:string,value:string}[]
  };
}

const WishItem: React.FC<WishItemProps> = ({
  data
}) => {
  const wish = useWish();
  const cart=useCart();
  const PreviewModal=usePreviewModel()

  const onRemove = () => {
    wish.removeItem(data.id);
  };

  const onAddToCart:MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
   const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    PreviewModal.onOpen(data);
  };
  
  return ( 
    <li className="flex py-6 border-b ">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
          <IconButton className="absolute bottom-4 left-16 text-black" onClick={onAddToCart} icon={<ShoppingCart size={15} />} />
          <IconButton className="absolute bottom-4 left-28  text-black" onClick={onPreview} icon={<Expand size={15} />} />

      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton className="    " onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black ">
              {data.name}
            </p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.description}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.price}</p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
}
 
export default WishItem;