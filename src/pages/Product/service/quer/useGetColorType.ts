import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useGetColorType = () => {
  return useQuery({
    queryKey: ["color"],
    queryFn: () => request.get<any>("color").then((res) => res.data),
  });
};

export default useGetColorType;
