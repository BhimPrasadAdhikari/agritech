// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//   apiVersion: '2024-09-30.acacia',
// });
// export const createPaymentSession = async (paymentMethod: string, amount: number,) => {
//   switch (paymentMethod) {
//     case 'credit_card':
//       // Create a payment session for credit card payments
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: 'Your Product Name',
//               },
//               unit_amount: amount * 100, // Amount in cents
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//       });
//       return session;

//     case 'paypal':
//       // Create a payment session for PayPal payments
//       const paypalSession = await stripe.checkout.sessions.create({
//         payment_method_types: ['paypal'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: 'Your Product Name',
//               },
//               unit_amount: amount * 100, // Amount in cents
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//       });
//       return paypalSession;

//     default:
//       throw new Error('Unsupported payment method');
//   }
// };
// export const payoutToExpert = async (expertId: string, amount: number) => {
//     try {
//       // Create a payout to the expert
//       const payout = await stripe.payouts.create({
//         amount: amount * 100, // Amount in cents
//         currency: 'usd', // Replace with your currency
//         destination: expertId, // Expert's connected account ID
//       });
  
//       console.log('Payout successful:', payout);
//       return { success: true, payoutId: payout.id };
//     } catch (error) {
//       console.error('Error processing payout:', error);
//       return { success: false, error: error.message };
//     }
//   };

//   export const subscriptionPayout = async (userId: string, plan: string) => {
//     try {
//       // Fetch user subscription details (assume you have a method to fetch this)
//       const subscriptionDetails = await fetchSubscriptionDetails(userId, plan);
  
//       if (!subscriptionDetails) {
//         throw new Error('No subscription details found for this user.');
//       }
  
//       const { amount } = subscriptionDetails; // amount should be in cents
//       const expertId = subscriptionDetails.expertId; // Assuming the expert ID is part of the subscription details
  
//       // Create a payout to the user's connected account
//       const payout = await stripe.payouts.create({
//         amount, // Amount in cents
//         currency: 'usd', // Replace with your currency
//         destination: userId, // User's connected account ID
//       });
  
//       console.log('Subscription payout successful:', payout);
//       return { success: true, payoutId: payout.id };
//     } catch (error) {
//       console.error('Error processing subscription payout:', error);
//       return { success: false, error: error.message };
//     }
//   };
  
//   /**
//    * Example function to fetch subscription details
//    * You would need to implement this function to fetch subscription details from your database
//    */
//   async function fetchSubscriptionDetails(userId: string, plan: string) {
//     // This is a placeholder function. Replace it with actual database logic to get subscription details.
//     // For example, using Prisma:
//     // return await prisma.subscription.findUnique({ where: { userId, plan } });
  
//     // Example mock data
//     return {
//       amount: 5000, // Example: $50.00
//       expertId: 'expert_123', // Example expert ID
//     };
//   }