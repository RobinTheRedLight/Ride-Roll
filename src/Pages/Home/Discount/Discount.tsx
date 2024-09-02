import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCouponCode } from "../../../redux/features/user/userSlice";
import Swal from "sweetalert2";
import clsx from "clsx";

type Promotion = {
  id: number;
  title: string;
  code: string;
  description: string;
};

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Summer Sale",
    code: "SUMMER2024",
    description: "Get 20% off all bikes with the coupon code SUMMER2024. Limited time offer!",
  },
  {
    id: 2,
    title: "Payment Discount",
    code: "PAYTK300",
    description: "Save ৳20 on any purchase over ৳300 with the coupon code PAYTK300.",
  },
  {
    id: 3,
    title: "Holiday Discount",
    code: "HOLIDAY50",
    description: "Save ৳50 on any purchase over ৳500 with the coupon code HOLIDAY50.",
  },
];

const Discount = () => {
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const dispatch = useDispatch();

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * promotions.length);
    const selected = promotions[randomIndex];

    // Calculate the angle for each slice (360 / number of promotions)
    const anglePerSlice = 360 / promotions.length;
    // Calculate the final rotation angle
    const finalRotation = rotation + 360 * 3 + randomIndex * anglePerSlice;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPromotion(selected);

      // Show the modal with the selected promotion
      Swal.fire({
        title: "Congratulations!",
        text: `You've won the ${selected.title} coupon.`,
        html: `
          <p class="text-lg font-bold mb-4">Coupon Code: ${selected.code}</p>
          <button id="copyCoupon" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Copy Code
          </button>
        `,
        showConfirmButton: false,
      });

      // Add event listener for the "Copy" button
      setTimeout(() => {
        const copyButton = document.getElementById("copyCoupon");
        if (copyButton) {
          copyButton.addEventListener("click", () => handleCopyCode(selected.code));
        }
      }, 100);
    }, 500); // Adjust the timeout to match the spin duration
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    dispatch(setCouponCode(code));
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `Coupon code ${code} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl text-gray-800 mb-8 text-center font-[Oswald]">
          Spin the Wheel to Get a Coupon!
        </h2>
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div
              className={clsx(
                "w-64 h-64 border-4 border-blue-500 rounded-full",
                "transition-transform duration-3000 ease-out",
                isSpinning && "transform rotate-[calc(1turn*3+var(--angle))]"
              )}
              style={{ "--angle": `${rotation}deg` } as React.CSSProperties}
            >
              {promotions.map((promotion, index) => (
                <div
                  key={promotion.id}
                  className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-right text-center"
                  style={{
                    transform: `rotate(${index * (360 / promotions.length)}deg)`,
                    transformOrigin: "bottom left",
                  }}
                >
                  <div className="text-white bg-blue-500 w-full h-full flex items-center justify-center">
                    <span className="transform -rotate-[calc(var(--angle))]">{promotion.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={spinWheel}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Spin the Wheel
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700 pt-10">
            Spin the wheel to get a coupon code that you can use at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Discount;
