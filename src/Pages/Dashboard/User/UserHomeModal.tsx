/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: any;
}

const UserHomeModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("phone", initialData.phone);
      setValue("address", initialData.address);
    }
  }, [initialData, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box bg-secondary text-secondary-content">
        <h2 className="text-xl font-bold mb-4">Edit Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            placeholder="Name"
            className="border p-2 mb-2 w-full bg-info"
          />

          <input
            type="tel"
            placeholder="Mobile number"
            className="border p-2 mb-2 w-full bg-info"
            {...register("phone", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <input
            {...register("address")}
            placeholder="Address"
            className="border p-2 mb-2 w-full bg-info"
          />

          <button type="submit" className="bg-black text-white p-2 rounded">
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white p-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserHomeModal;
