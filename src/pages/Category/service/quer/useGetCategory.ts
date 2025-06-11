import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { categoryList } from "../../types";

const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () =>
      request.get<categoryList>("/category").then((res) => res.data),
  });
};

export default useGetCategory;
