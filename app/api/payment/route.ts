export const dynamic = 'force-static'

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getServerSession } from "next-auth";
export async function POST(req: Request) {
  const purchase_order_id = uuidv4();
  const session = await getServerSession();
  try {
    const { paymentMethod, amount, purchase_order_name, paidFor} =
      await req.json();
      const amount_breakdown = [
        {
          label: "Mark Price",
          amount: Number(amount) * 100,
        },
        {
          label: "VAT",
          amount: 0,
        },
        {
          label: "Deliver Charge",
          amount: 0,
        },
      ];
      const product_details = [
        {
          identity: uuidv4(),
          name: purchase_order_name,
          total_price: amount,
          quantity: 1,
          unit_price: amount,
        },
      ];
      const customer_info = {
        name: session?.user.name,
        email: session?.user.email,
      };
    switch (paymentMethod) {
      case "khalti":
        try {
          const Khalti_response = await axios.post(
            `${process.env.KHALTI_PAYMENT_API}initiate/`,
            JSON.stringify({
              return_url: `${process.env.NEXT_PUBLIC_STORE_URL}${paidFor}`,
              website_url: `${process.env.NEXT_PUBLIC_STORE_URL}`,
              amount: amount * 100,
              purchase_order_id,
              purchase_order_name,
              customer_info,
              amount_breakdown,
              product_details,
              merchant_username: `${process.env.KHALTI_MERCHANT_USERNAME}`,
              merchant_extra: `${process.env.KHALTI_MERCHANT_EMAIL}`,
            }),
            {
              headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
            }
          ); //Khalti_post ends here
          console.log(Khalti_response.data);
          const lookup_response = await axios.post(
            `${process.env.KHALTI_PAYMENT_API}lookup/`,
            JSON.stringify({
              pidx: Khalti_response.data.pidx,
            }),
            {
              headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (lookup_response.data.status === "Pending") {
            return NextResponse.json({
              redirect_url: Khalti_response.data.payment_url,
              method: "khalti",
              success: true,
              message: "payment initiated",
            });
          }
        } catch (error) {
          console.error("KHALTI_PAYMENT_ERROR", error);
          return NextResponse.json({
            message: "payment not initiated",
            success: false,
          });
        } //outer try catch ends here

        break;
      case "paypal":
        break;
      case "stripe":
        break;
      default:
        return NextResponse.json({
          success: false,
          message: "Invalid payment method",
        });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
