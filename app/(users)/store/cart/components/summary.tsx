
import { Button } from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import useShipingModel from "@/hooks/use-shiping-model";
const Summary = () => {
  const shipingModel = useShipingModel();
  const items = useCart((state) => state.items);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price-item.price * (item.discount/100));
  }, 0);
 const totalDiscount = items.reduce((total, item) => {
  return total + Number(item.price * (item.discount/100));
}, 0);
  const onCheckout = () => {
    shipingModel.onOpen();
  };

  return (
    <div className="mt-8 rounded-lg bg-gray-50      px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900 ">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 ">
            Order Total<span className="text-sm">(inc tax and delivery charge)</span>
          </div>
          <Currency value={totalPrice+totalPrice*0.13+totalPrice*0.02} />
        </div>
        <div className="flex items-center justify-between border-t  pt-4">
          <div className="text-base font-medium text-yellow-600">
            Vat Amount
          </div>
          <span><Currency value={totalDiscount*0.13} /></span>
        </div>
        <div className="flex items-center justify-between border-t  pt-4">
          <div className="text-base font-medium text-yellow-600">
              Delivery Charge          </div>
          <span><Currency value={totalPrice*0.02} /></span>
        </div>
        <div className="flex items-center justify-between border-t  pt-4">
          <div className="text-base font-medium text-yellow-600">
            Total Discount
          </div>
          <span><Currency value={totalDiscount} /></span>
        </div>
      </div>
      {items.length !== 0 ? (
        <Button onClick={onCheckout} className="w-full mt-6 dark:border">
          Checkout
        </Button>
      ) : (
        <Button onClick={() => (window.location.href = "/")} className="w-full mt-6">
          Add Product
        </Button>
      )}
    </div>
  );
};

export default Summary;
