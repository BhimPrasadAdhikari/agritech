"use client";
import { MouseEventHandler, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import IconButton from "@/components/ui/icon-button";
import { Expand, HeartIcon, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import useWish from "@/hooks/use-wish";
// import Skeleton from "@/components/skeleton/productCard-skeleton"; // Optional: Use for initial load if desired
// import RatingComponent from "../rating";
// import DisplayRating from "../display-rating";

export interface ProductCardProps {
  data: {id:string,
  name:string,
  description:string,
  discount:number,
  images:{url:string}[],
  ratings:{rating:number}[],
  price:number,
  discountedPrice:number,
  category:string,
  subCategory:string,
  productSpecifications:{name:string,value:string}[];}
  
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const wish = useWish();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to track loading of image

  const onClickHandler = () => {
    router.push(`/product/${data?.id}`);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  const onAddToWish: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    wish.addItem(data);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  return (
    <div
      onClick={onClickHandler}
      className="bg-white      group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl relative overflow-hidden">
        {/* Image Loading Effect */}
        {loading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <Image
          src={data.images[0].url}
          alt={data.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
          className={`w-full h-full rounded-md transition-opacity duration-8000 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)} // Hide skeleton when image loads
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent to-white ${
            loading ? "transition-opacity duration-500" : "opacity-0"
          }`}
        />

        <IconButton
          onClick={onAddToWish}
          icon={
            <HeartIcon size={15} className="text-grey-600     " />
          }
          className="absolute top-0 group-hover:opacity-100"
        />
        <div className="group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={
                <Expand size={15} className="text-grey-600     " />
              }
              className=""
            />
            <IconButton
              onClick={onAddToCart}
              icon={
                <ShoppingCart
                  size={15}
                  className="text-grey-600     "
                />
              }
              className=""
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-gray-500 text-sm">{data.category}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
      <div>
        {/* <RatingComponent product={data} /> */}
        {/* <DisplayRating rating={data.averageRating}/> */}
      </div>
    </div>
  );
};

export default ProductCard;
