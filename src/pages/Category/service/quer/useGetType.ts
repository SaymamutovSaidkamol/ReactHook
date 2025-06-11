import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useGetCategoryType = () => {
  return useQuery({
    queryKey: ["type"],
    queryFn: () => request.get<any>("type").then((res) => res.data),
  });
};

export default useGetCategoryType;
