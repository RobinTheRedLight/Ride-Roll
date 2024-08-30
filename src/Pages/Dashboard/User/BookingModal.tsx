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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
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
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Pay Tk 100(Advance)
            </button>
          </Link>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
