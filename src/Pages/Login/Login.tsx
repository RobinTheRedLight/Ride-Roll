import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginFormInputs } from "../../types";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(userInfo).unwrap();
      if (result) {
        dispatch(setUser({ user: result.data, token: result.token }));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/dashboard/profile");
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
    <div className="min-h-screen flex items-center justify-center font-[Roboto] ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-8 rounded shadow-md w-96 bg-secondary text-secondary-content"
      >
        <h2 className="text-3xl lg:text-4xl mb-6 text-center font-[Oswald]">
          Login
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue="admin@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-3 py-2 border rounded  ${
              errors.email ? "border-red-500" : "border"
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
            defaultValue="admin123"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-3 py-2 border rounded   ${
              errors.password ? "border-red-500" : "border"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button type="submit" className="w-full btn btn-primary">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          <span className=""> Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
