import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useDeleteCateg = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/products/${id}`).then((res) => res.data),
  });
};

export default useDeleteCateg;
