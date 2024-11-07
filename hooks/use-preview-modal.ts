import { create } from "zustand";
type Product={
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

interface PreviewModelStore {
  isOpen: boolean;
  data?: Product;
  onOpen: (data: Product) => void;
  onClose: () => void;
}
const usePreviewModel = create<PreviewModelStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModel;
