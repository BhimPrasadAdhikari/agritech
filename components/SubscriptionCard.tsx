import qs from "query-string";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import useSubscription from "@/hooks/use-subscription";
import { Button } from "./ui/Button";
import Image from "next/image";
interface FeatureProps {
  icon: ReactNode;
  text: string;
}
interface SubscriptionCardProps {
  plan: string;
  price: number;
  buttonText: string;
  onShowButton:(value:boolean)=>void;
  disable:boolean;
  features: FeatureProps[];
}
const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  price,
  features,
  onShowButton,
  disable,
  buttonText,
}) => {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const subscriptionStore = useSubscription();
  function onClickHandler() {
    setShowButton(true);
    onShowButton(true);
  }
  function onClickCancel(){
    setShowButton(false)
    onShowButton(false)
  }
  const total_amount = price || 0;
  const handlePayment = async (paymentMethod: string) => {
    subscriptionStore.addSubscription({
      plan: plan,
      price: price,
    });
    setLoading(true);
    if (paymentMethod === "esewa") {
      const url = qs.stringifyUrl({
        url: "/payment",
        query: {
          total_amount: total_amount.toString(),
          paymentMethod: paymentMethod,
          purchase_order_name: "subscription",
          paidFor: "subscription",
        },
      });
      window.location.href = url;
    }
    if (paymentMethod !== "esewa") {
      try {
        const response = await axios.post("/api/payment", {
          paymentMethod,
          amount: total_amount,
          purchase_order_name: "subscription",
          paidFor: "subscription",
        });
        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message);
          if (response.data.method === "khalti") {
            window.location.href = response.data.redirect_url;
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setShowButton(false);
        // After payment success:
      }
    }
  };
console.log(subscriptionStore.subscription);
  return (
    <div className="border border-green-300 shadow-md p-6 rounded-lg text-center bg-white      hover:shadow-lg transform transition-transform hover:scale-105">
      <h3 className="text-2xl font-bold text-green-600 mb-4">{plan}</h3>
      <div className="text-4xl font-bold text-green-700 mb-4">
        ${price}
        <span className="text-lg text-gray-500">/month</span>
      </div>
      <ul className="text-left mb-6">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className="mr-2">{feature.icon}</span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "bg-green-600 text-white     py-2 px-6 rounded-full hover:bg-green-700 disabled:cursor-not-allowed",
          showButton && "hidden"
        )}
        onClick={onClickHandler}
        disabled={disable}
      >
        {buttonText}
      </button>
      {showButton && (
        <div>
          <h1>Choose Payment</h1>
          <Button
            onClick={() => handlePayment("khalti")}
            className="w-full mt-6 bg-purple-300 flex justify-center items-center h-12"
            disabled={loading}
          >
            {loading ? (
              "Processing..."
            ) : (
              <svg
                id="Logo"
                xmlns="http://www.w3.org/2000/svg"
                width="118"
                height="44.95"
                viewBox="0 0 118 44.95"
              >
                <g id="khalti-logo-01" transform="translate(0)">
                  <g id="XMLID_486_" transform="translate(7.963)">
                    <g id="XMLID_487_" transform="translate(0)">
                      <path
                        id="XMLID_488_"
                        d="M45.7,1A2.383,2.383,0,0,0,43.863.2H2.542A2.324,2.324,0,0,0,.707,1,2.186,2.186,0,0,0,.149,2.912L3.1,31.27A7.1,7.1,0,0,0,6.052,35.9l14.6,8.615a5.306,5.306,0,0,0,2.593.638,5.2,5.2,0,0,0,2.593-.638l14.6-8.615a6.913,6.913,0,0,0,2.951-4.627L46.336,2.912A2.785,2.785,0,0,0,45.7,1ZM33.732,32.427a2.6,2.6,0,0,1-3.59-.678L22.684,20.781l-4.507,4.507v4.986a2.593,2.593,0,1,1-5.185,0V8.656a2.593,2.593,0,0,1,5.185,0v9.293L29.3,6.821a2.595,2.595,0,1,1,3.669,3.669l-6.581,6.541c0,.04.04.04.04.08L34.41,28.8A2.66,2.66,0,0,1,33.732,32.427Z"
                        transform="translate(-0.115 -0.2)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_483_" transform="translate(53.306 5.783)">
                    <g id="XMLID_484_" transform="translate(0 0)">
                      <path
                        id="XMLID_485_"
                        d="M65.493,5.207V23.275A4.443,4.443,0,0,1,61.066,27.7H.8l.16-1.914H61.066a2.554,2.554,0,0,0,2.513-2.513V5.127a2.554,2.554,0,0,0-2.513-2.513H3.393L3.552.7H61.066A4.46,4.46,0,0,1,65.493,5.207Z"
                        transform="translate(-0.8 -0.7)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_479_" transform="translate(59.728 12.364)">
                    <g id="XMLID_482_-link" transform="translate(0 0)">
                      <path
                        id="XMLID_482_"
                        d="M2.1,2.234a.358.358,0,0,0-.4-.4H.9V.2H2.735c.877,0,1.276.239,1.276,1.157V7.778h.877a1.412,1.412,0,0,0,1.037-.4L8.239,4.188h2.154L7.72,7.818a5.018,5.018,0,0,1-.758.758v.04s.359.12.638.758l1.436,2.672c.16.279.359.4.877.4h.558v1.6h-1.4a1.477,1.477,0,0,1-1.635-.917L5.646,9.812a1.088,1.088,0,0,0-1-.4H3.891V14.08H1.977Z"
                        transform="translate(-0.9 -0.2)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_476_" transform="translate(70.058 12.404)">
                    <g id="XMLID_477_" transform="translate(0 0)">
                      <path
                        id="XMLID_478_"
                        d="M2,2.334a.358.358,0,0,0-.4-.4H.8V.3H2.635c.877,0,1.276.359,1.276,1.2V5.365a7.111,7.111,0,0,1-.04.8h.04a3.864,3.864,0,0,1,3.63-2.194c2.313,0,3.35,1.276,3.35,3.829v4.268a.358.358,0,0,0,.4.4h.8v1.6H10.253c-.877,0-1.276-.359-1.276-1.276V8.237c0-1.4-.279-2.473-1.835-2.473A3.244,3.244,0,0,0,4.031,8.2a4.763,4.763,0,0,0-.16,1.316V14.14H1.957Z"
                        transform="translate(-0.8 -0.3)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_470_" transform="translate(82.622 16.114)">
                    <g id="XMLID_473_-link" transform="translate(0 0)">
                      <path
                        id="XMLID_473_"
                        d="M4.169,9.415C5.8,9.415,6.841,7.739,6.841,6.3V5.945H6.363c-1.436,0-3.988.04-3.988,1.914C2.294,8.7,2.932,9.415,4.169,9.415ZM6.363,4.588h.4v-.12c0-1.715-.638-2.353-2.194-2.353-.479,0-1.635.12-1.635.758v.558H1.138v-1C1.138.8,3.61.6,4.528.6,7.719.6,8.556,2.275,8.556,4.469V8.7a.389.389,0,0,0,.4.439h.8v1.6H7.958c-.877,0-1.2-.4-1.2-1.157a3.152,3.152,0,0,1,.04-.558h-.04A3.383,3.383,0,0,1,3.65,10.97,3.1,3.1,0,0,1,.3,7.979C.38,4.828,4.727,4.588,6.363,4.588Z"
                        transform="translate(-0.3 -0.6)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_466_" transform="translate(92.872 12.484)">
                    <g id="XMLID_469_-link" transform="translate(0 0)">
                      <path
                        id="XMLID_469_"
                        d="M.877,2.135H0V.5H1.835c.877,0,1.276.359,1.276,1.276v10.45a.358.358,0,0,0,.4.4h.8v1.6H2.473c-.877,0-1.276-.359-1.276-1.276V2.534A.3.3,0,0,0,.877,2.135Z"
                        transform="translate(0 -0.5)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_463_" transform="translate(98.057 13.601)">
                    <g id="XMLID_464_" transform="translate(0 0)">
                      <path
                        id="XMLID_465_"
                        d="M1.276,4.568H0V3.052H1.316V.3H3.151V3.052H5.5V4.568H3.191V9.075a1.986,1.986,0,0,0,2.034,2.273H5.7V12.9a4.291,4.291,0,0,1-.638.04c-1.276,0-3.749-.4-3.749-3.709V4.568Z"
                        transform="translate(0 -0.3)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_460_" transform="translate(106.593 12.444)">
                    <g id="XMLID_461_" transform="translate(0 0)">
                      <path
                        id="XMLID_462_"
                        d="M.639.4h1.2a.257.257,0,0,1,.239.239V2.115a.257.257,0,0,1-.239.239H.639A.257.257,0,0,1,.4,2.115V.639A.212.212,0,0,1,.639.4Z"
                        transform="translate(-0.4 -0.4)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_457_" transform="translate(105.316 16.353)">
                    <g id="XMLID_458_" transform="translate(0 0)">
                      <path
                        id="XMLID_459_"
                        d="M1.4,2.234a.358.358,0,0,0-.4-.4H.2V.2H2.035c.877,0,1.276.359,1.276,1.276V8.057a.358.358,0,0,0,.4.4h.8v1.6H2.673C1.8,10.052,1.4,9.693,1.4,8.775Z"
                        transform="translate(-0.2 -0.2)"
                        fill="#5d2e8e"
                      />
                    </g>
                  </g>
                  <g id="XMLID_432_" transform="translate(0 7.85) rotate(-6)">
                    <g id="XMLID_453_-link" transform="translate(0.04 0.08)">
                      <path
                        id="XMLID_453_"
                        d="M4.906,0,0,.6,1.835,15.156l4.587-.519Z"
                        transform="translate(0 0)"
                        fill="#f9a61c"
                      />
                    </g>
                    <g id="XMLID_454_" transform="translate(0 0)">
                      <g id="XMLID_455_">
                        <rect
                          id="XMLID_456_"
                          width="6.581"
                          height="15.316"
                          fill="#f9a61c"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            )}
          </Button>
          <Button
            className="w-full mt-6 bg-green-400 flex items-center justify-center h-12"
            onClick={() => handlePayment("esewa")}
            disabled={loading}

            // type="submit"
          >
            {loading ? (
              "Processing..."
            ) : (
              <Image
                src="https://epay.esewa.com.np/assets/img/logo.svg"
                width={120}
                height={31}
                alt="eSewa logo"
              />
            )}
          </Button>
          <Button 
           className="w-full mt-6 bg-green-200 flex items-center justify-center h-12"
           onClick={onClickCancel}
           disabled={loading}
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default SubscriptionCard;
