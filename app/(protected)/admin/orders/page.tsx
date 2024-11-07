import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';
import { formatter } from '@/lib/utils';
const OrdersPage = async () => {
  const Orders = await prismadb.order.findMany({
    include: {
      orderItems:{
        include:{product: {
          include:{
            images:true,
          }
        }

          }
       }   },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedOrders: OrderColumn[] = Orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    paymentStatus:item.paymentStatus,
    orderStatus:item.orderStatus,
    products: item.orderItems.map((orderItem)=>orderItem.product?.name).join(', '),
    quantities: item.orderItems.map((orderItem)=>orderItem.quantity).join(', '),
    totalPrice: formatter.format(item.orderTotal),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
