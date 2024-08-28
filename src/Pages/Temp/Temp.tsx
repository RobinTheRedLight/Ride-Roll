import { useGetAllUsersQuery } from "../../redux/features/admin/adminApi";

const Temp = () => {
  const { data } = useGetAllUsersQuery(undefined);
  console.log(data);
  return <div></div>;
};

export default Temp;
