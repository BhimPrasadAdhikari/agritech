import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(
  request: Request
) {
  const body = await request.json();
  const { pidx, total_amount, productDetails, details, transaction_id, tidx } =
    body;
  if (productDetails.length === 0) {
    return new NextResponse("Product Ids are required", {
      status: 400,
    });
  }
  const productIds = productDetails.map((product: any) => product.productId);
  const quantities = productDetails.map((product: any) => product.quantity);
  const sizes = productDetails.map((product: any) => product.size);
  if (!quantities || quantities.length !== productIds.length) {
    return new NextResponse("Quantities must match product IDs", {
      status: 400,
    });
  }
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", {
      status: 400,
    });
  }

  try {
    const lookup_response = await axios.post(
      `${process.env.KHALTI_PAYMENT_API}lookup/`,
      JSON.stringify({
        pidx,
      }),
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (lookup_response.data.status === "Completed") {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}payment/verify`,
        JSON.stringify({
          pidx,
          total_amount,
          productDetails,
          details,
          transaction_id,
          tidx,
          productIds,
          quantities,
          sizes,
          paymentMethod:"Khalti Payment",
          paymentStatus:'Completed'
        })
      );
      console.log(res)
      return NextResponse.json({
        response: res.data,
        success: true,
        message: "payment initiated",
      });
    }
  } catch (error) {
    console.log("PAYMENT_VERIFICATION", error);
    return NextResponse.json({
      response: "",
      success: false,
      message: "Verification Failed",
    });
  }
}

//    const response = await axios.post('https://a.khalti.com/api/v2/payment/verify/',
//     JSON.stringify({
//     token:pidx,
//     amount:total_amount
// }), {
//    "headers":{
//       Authorization:'Key a7ece28fa52348fbb36781362509e92a',
//       "Content-Type":"application/json"
//     }
//   });
// Check if the payment is successful
// if (response.data.state.name === 'Completed' && response.data.total_amount === total_amount) {
// Create the order in the database
// const paymentMethod = response.data.type.name

//   }
//   else {
// return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
// }
