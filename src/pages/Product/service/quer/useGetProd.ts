import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useGetCategory = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      request.get<any>("/products").then((res) => res.data),
  });
};

export default useGetCategory;
