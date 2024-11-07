import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

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

interface WishStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useWish = create(
  persist<WishStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in wishlist.");
        }

        set({ items: [...get().items, data] });
        toast.success("added to  wishlist");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from wishlist.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "wish-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWish;
