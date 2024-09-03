import { useDispatch } from "react-redux";
import { setCouponCode } from "../../../redux/features/user/userSlice";
import { useGetAllCouponsQuery } from "../../../redux/features/admin/adminApi";
import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";
import Swal from "sweetalert2";

type Promotion = {
  code: string;
  description: string;
  discount: number;
  expiryDate: string;
  __v: number;
  _id: string;
};

const segments = [
  { segmentText: "10% discount", segColor: "red" },
  { segmentText: "20% discount", segColor: "blue" },
  { segmentText: "30% discount", segColor: "green" },
];

const Discount = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllCouponsQuery(undefined);

  if (isLoading) {
    return (
      <span className="loading loading-infinity loading-lg h-full mx-auto"></span>
    );
  }

  const promotions = data.data;

  const handleSpinFinish = (result: string) => {
    const str = result;
    const parts = str.split("%");
    const number = Number(parts[0]);
    console.log(number);

    let couponCode = "";
    let couponMessage = "No discount";

    if (number === 10) {
      console.log(number);
      couponCode = "FREE10";
      couponMessage = "10% discount";
    }
    if (number === 20) {
      couponCode = "FREE20";
      couponMessage = "20% discount";
    }
    if (number === 30) {
      couponCode = "FREE30";
      couponMessage = "30% discount";
    }

    Swal.fire({
      title: `You've won the ${couponMessage} coupon.`,
      html: `
        <p class="text-lg font-bold mb-4">Coupon Code: ${couponCode}</p>
        <button id="copyCoupon" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Copy Code
        </button>
      `,
      showConfirmButton: false,
    });

    setTimeout(() => {
      const copyButton = document.getElementById("copyCoupon");
      if (copyButton) {
        copyButton.addEventListener("click", () => handleCopyCode(couponCode));
      }
    }, 100);
  };

  const spinWheelProps: ISpinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "white",
    buttonText: "Spin",
    isOnlyOnce: false,
    size: 190,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: false,
    isSpinSound: true,
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    dispatch(setCouponCode(code));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Copied!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl text-gray-800 mb-8 text-center font-[Oswald]">
          Coupons & Discounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-[Roboto]">
          {promotions.map((promotion: Promotion) => (
            <div
              key={promotion._id}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <p className="text-lg font-bold text-blue-600 mb-4">
                Use Code: {promotion.code}
              </p>
              <p className="text-gray-600 mb-4">{promotion.description}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleCopyCode(promotion.code)}
              >
                Copy Code
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700">
            To apply a coupon, enter the code at checkout in the coupon field.
          </p>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-3xl lg:text-4xl text-gray-800 mb-8 text-center font-[Oswald]">
          Spin the Wheel to Get a Coupon!
        </h2>
        <div className="flex justify-center items-center">
          <SpinWheel {...spinWheelProps} />
        </div>
      </div>
    </div>
  );
};

export default Discount;
