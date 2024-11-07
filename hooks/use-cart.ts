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
interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  // increaseItem: (id: string, actionType: string) => void;
  removeAll: () => void;
}
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in cart.");
        }
        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart.");
      },
      // increaseItem: (id: string, actionType: string) => {
      //   set((state) => {
      //     return {
      //       items: state.items.map((item) => {
      //         if (item.id === id) {
      //           let newQuantity = item.quantity;

      //           if (actionType === "INCREASE" && newQuantity < item.stock) {
      //             newQuantity++;
      //           } else if (actionType === "DECREASE" && item.quantity > 1) {
      //             newQuantity--;
      //           }
      //           return {
      //             ...item,
      //             quantity: newQuantity,
      //           };
      //         }
      //         return item;
      //       }),
      //     };
      //   });
      // },
      

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useCart;
