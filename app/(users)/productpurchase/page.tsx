
"use client";

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import Summary from './components/summary';
import CartItem from './components/cart-item';


const CartPage = () => {
  const cart = useCart();
  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black mb-6 dark:text-white">Payment</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12 gap-y-8">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <Summary summaryData={cart.items} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
