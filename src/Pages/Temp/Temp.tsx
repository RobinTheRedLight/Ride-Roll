import { useGetAllUsersQuery } from "../../redux/features/admin/adminApi";
import { useGetProfileQuery } from "../../redux/features/user/userApi";

const Temp = () => {
  // const { data } = useGetAllUsersQuery(undefined);
  const { data, isLoading } = useGetProfileQuery(undefined);
  if (!isLoading) {
    console.log(data.data.name);
  }

  return <div></div>;
};

export default Temp;
