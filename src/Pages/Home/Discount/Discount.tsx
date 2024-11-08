import { useDispatch } from "react-redux";
import { setCouponCode } from "../../../redux/features/user/userSlice";
import { useGetAllCouponsQuery } from "../../../redux/features/admin/adminApi";
import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import { fadeLeft, fadeRight } from "../../../Animation/constant";

type Promotion = {
  code: string;
  description: string;
  discount: number;
  expiryDate: string;
  __v: number;
  _id: string;
};

const segments = [
  { segmentText: "10% discount", segColor: "#235379" },
  { segmentText: "20% discount", segColor: "#88C1E8" },
  { segmentText: "30% discount", segColor: "#1C8AD5" },
];

const Discount = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllCouponsQuery(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useAppSelector(selectCurrentUser) as any;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-0 md:px-8">
          <h2 className="text-4xl lg:text-5xl  mb-8 text-center font-[Oswald]">
            No Coupons Available
          </h2>
        </div>
      </div>
    );
  }

  const promotions = data.data;

  const handleSpinFinish = (result: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You must log in to use the spin wheel and get coupons.",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Okay",
      });
      return;
    }

    const str = result;
    const parts = str.split("%");
    const number = Number(parts[0]);

    let couponCode = "";
    let couponMessage = "No discount";

    if (number === 10) {
      couponCode = "FREE10";
      couponMessage = "10% discount";
    } else if (number === 20) {
      couponCode = "FREE20";
      couponMessage = "20% discount";
    } else if (number === 30) {
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
    size: window.innerWidth < 768 ? 150 : 190,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: false,
    isSpinSound: true,
  };

  const handleCopyCode = (code: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You must log in to copy the coupon code.",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Okay",
      });
      return;
    }

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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-center border-2 border-gray-200 border-opacity-60 rounded-lg shadow-lg bg-secondary text-secondary-content p-3">
          {/* Container */}
          <div className="flex flex-col-reverse lg:flex-row rounded-lg overflow-hidden w-full">
            {/* Text and Form Section */}
            <div className="w-full lg:w-1/2 p-6 space-y-4">
              <div className="md:ml-2">
                <h2 className="text-2xl lg:text-3xl font-medium text-center lg:text-left">
                  Feeling Lucky? <br /> Spin the Wheel to Win a Coupon!
                </h2>
                <p className="text-center lg:text-left">
                  Every spinner is a winner!
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  {promotions.length === 0 ? (
                    <p className="text-center">No coupons available.</p>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-[Roboto]">
                      {promotions.map((promotion: Promotion) => (
                        <motion.div
                          variants={fadeLeft}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          whileTap={{ scale: 0.95 }}
                          key={promotion._id}
                          className="p-6 rounded-lg shadow-lg text-center border"
                        >
                          <p className="text-lg font-bold text-blue-600 mb-4">
                            Use Code: {promotion.code}
                          </p>
                          <p className="mb-4">{promotion.description}</p>
                          <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleCopyCode(promotion.code)}
                          >
                            Copy Code
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  <div className="mt-8 text-center">
                    <p>
                      To apply a coupon, enter the code at checkout in the
                      coupon field.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Spin Wheel Section */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center items-center lg:w-1/2 p-6 mt-6 lg:mt-0"
            >
              <SpinWheel {...spinWheelProps} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
