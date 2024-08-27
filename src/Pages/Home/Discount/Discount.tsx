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
    description:
      "Get 20% off all bikes with the coupon code SUMMER2024. Limited time offer!",
  },
  {
    id: 2,
    title: "Free Shipping",
    code: "FREESHIP",
    description:
      "Enjoy free shipping on all orders above $100 with the code FREESHIP.",
  },
  {
    id: 3,
    title: "Holiday Discount",
    code: "HOLIDAY50",
    description:
      "Save $50 on any purchase over $500 with the coupon code HOLIDAY50.",
  },
];

const Discount = () => {
  return (
    <div className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl text-gray-800 mb-8 text-center font-[Oswald]">
          Coupons & Discounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-[Roboto]">
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {promotion.title}
              </h3>
              <p className="text-lg font-bold text-blue-600 mb-4">
                Use Code: {promotion.code}
              </p>
              <p className="text-gray-600 mb-4">{promotion.description}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigator.clipboard.writeText(promotion.code)}
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
    </div>
  );
};

export default Discount;
