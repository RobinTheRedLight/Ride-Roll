import { useState } from "react";
import { useGetRentalsQuery } from "../../../redux/features/user/userApi";
import RentalCard from "./RentalCard";

const tabStyle = {
  padding: "10px 20px",
  cursor: "pointer",
  borderBottom: "2px solid transparent",
};

const activeTabStyle = {
  ...tabStyle,
  borderBottom: "2px solid blue",
};

type Rental = {
  _id: string;
  userId: string;
  bikeId: string;
  startTime: string;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
  isPaid: boolean;
};

const Rental = () => {
  const [activeTab, setActiveTab] = useState<"Paid" | "Unpaid">("Unpaid");
  const { data, isLoading } = useGetRentalsQuery(undefined);

  if (isLoading) {
    return (
      <span className="loading loading-infinity loading-lg h-full mx-auto"></span>
    );
  }

  const rentals = data.data;

  const paidRentals = rentals.filter(
    (rental: Rental) => rental.isPaid === true
  );
  const UnPaidRentals = rentals.filter(
    (rental: Rental) => rental.isPaid === false
  );

  const handleTabClick = (tab: "Paid" | "Unpaid") => {
    setActiveTab(tab);
  };

  return (
    <div className=" p-10 font-[Roboto]">
      <h1 className="text-4xl lg:text-5xl font-[Oswald]">My Rentals</h1>
      <div style={{ display: "flex" }} className="mt-5">
        {/* Tabs */}
        <div
          style={activeTab === "Unpaid" ? activeTabStyle : tabStyle}
          onClick={() => handleTabClick("Unpaid")}
        >
          Unpaid
        </div>
        <div
          style={activeTab === "Paid" ? activeTabStyle : tabStyle}
          onClick={() => handleTabClick("Paid")}
        >
          Paid
        </div>
      </div>

      {/* Content based on active tab */}
      <div style={{ marginTop: "20px" }}>
        {activeTab === "Unpaid" && (
          <div className="container mx-auto">
            <div className="grid gap-0  grid-cols-1 md:grid-cols-2  place-items-center">
              {UnPaidRentals.length === 0 ? (
                <p className="text-center text-xl">No rentals found.</p>
              ) : (
                UnPaidRentals.map((rental: Rental) => (
                  <RentalCard key={rental._id} rental={rental} />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "Paid" && (
          <div className="container mx-auto">
          <div className="grid gap-0  grid-cols-1 md:grid-cols-2  place-items-center">
            {paidRentals.length === 0 ? (
              <p className="text-center text-xl">No rentals found.</p>
            ) : (
              paidRentals.map((rental: Rental) => (
                <RentalCard key={rental._id} rental={rental} />
              ))
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Rental;
