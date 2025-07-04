import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useGetCategoryType = () => {
  return useQuery({
    queryKey: ["type"],
    queryFn: () => request.get<any>("category").then((res) => res.data),
  });
};

export default useGetCategoryType;
