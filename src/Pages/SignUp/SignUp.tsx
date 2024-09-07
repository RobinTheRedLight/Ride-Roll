import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { SignupFormInputs } from "../../types";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const navigate = useNavigate();

  const [signup] = useSignUpMutation();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    const userInfos = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: "user",
    };

    try {
      const result = await signup(userInfos).unwrap();
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Congratulations, your account has been successfully created",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      }
    } catch (error) {
      const errorMessage = (
        error as { data: { errorSources: { message: string }[] } }
      ).data.errorSources[0].message;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-[Roboto]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-8 rounded shadow-md w-96"
      >
        <h2 className="text-3xl lg:text-4xl mb-6 text-center font-[Oswald]">
          Sign Up
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-3 py-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label className="block" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Phone number must be 11 digits",
              },
            })}
            className={`w-full px-3 py-2 border rounded ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address Field */}
        <div className="mb-6">
          <label className="block" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            {...register("address", { required: "Address is required" })}
            className={`w-full px-3 py-2 border rounded ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <button type="submit" className="w-full btn btn-primary">
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
