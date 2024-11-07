interface CartItemInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: Record<string, any>; // Changed from number to any for broader compatibility
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ product }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-semibold text-black">{product.name}</p>
        </div>

        <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm">
          <p className="text-gray-500">{product.color}</p>
          <p className="mt-1 sm:mt-0 sm:ml-4 border-l border-gray-200 pl-4 text-gray-500">
            {product.size}
          </p>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

export default CartItemInfo;
