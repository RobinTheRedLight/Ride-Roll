import { useState } from "react";
import { Link } from "react-router-dom";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (startTime: string) => void;
  id: string | undefined;
};

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onConfirmBooking,
  id,
}) => {
  const [startTime, setStartTime] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBooking(startTime);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className=" p-6 rounded shadow-lg w-full max-w-md  backdrop-blur-lg backdrop-brightness-150">
        <h2 className="text-xl font-bold mb-4">Book Your Ride</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <Link to={`/dashboard/payment/${id}`} state={{ startTime }}>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Pay Tk 100(Advance)
            </button>
          </Link>
        </form>
        <button
          onClick={onClose}
          className="mt-4 btn btn-error"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
