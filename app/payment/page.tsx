import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const PaymentPage = async (
  props: {
    params: Params
    searchParams: SearchParams
  }
) => {
  const searchParams = await props.searchParams
  const total_amount = searchParams.total_amount || "0";
  const paymentMethod = searchParams.paymentMethod;
  const paidFor = searchParams.paidFor;
  const transaction_uuid = uuidv4();
  const product_code = "EPAYTEST";
  const hmac = createHmac("sha256", "8gBm/:&EnhH.1/q");
  const msg = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const data = hmac.update(msg);
  const signature = data.digest("base64");
  return (
    <>
      {paymentMethod === "esewa" && (
        <div>
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
            id="paymentForm"
          >
            <div className="hidden">
              <input
                type="text"
                id="amount"
                name="amount"
                value={`${total_amount}`}
                readOnly
                required
              />
              <input
                type="text"
                id="tax_amount"
                name="tax_amount"
                value="0"
                readOnly
                required
              />
              <input
                type="text"
                id="total_amount"
                name="total_amount"
                value={`${total_amount}`}
                required
                readOnly
              />
              <input
                type="text"
                id="transaction_uuid"
                name="transaction_uuid"
                value={`${transaction_uuid}`}
                required
                readOnly
              />
              <input
                type="text"
                id="product_code"
                name="product_code"
                value={product_code}
                required
                readOnly
              />
              <input
                type="text"
                id="product_service_charge"
                name="product_service_charge"
                value="0"
                required
                readOnly
              />
              <input
                type="text"
                id="product_delivery_charge"
                name="product_delivery_charge"
                value="0"
                required
                readOnly
              />
              <input
                type="text"
                id="success_url"
                name="success_url"
                value={`${process.env.NEXT_PUBLIC_STORE_URL}${paidFor}`}
                required
                readOnly
              />
              <input
                type="text"
                id="failure_url"
                name="failure_url"
                value={`${process.env.NEXT_PUBLIC_STORE_URL}${paidFor}`}
                required
                readOnly
              />
              <input
                type="text"
                id="signed_field_names"
                name="signed_field_names"
                value="total_amount,transaction_uuid,product_code"
                required
                readOnly
              />
              <input
                type="text"
                id="signature"
                name="signature"
                value={signature}
                required
                readOnly
              />
            </div>
          </form>

          <script
            dangerouslySetInnerHTML={{
              __html: `
          document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById("paymentForm");
            if (form) {
              form.submit(); // Auto-submit the form
            }
          });
        `,
            }}
          />
        </div>
      )}
    </>
  );
};

export default PaymentPage;
