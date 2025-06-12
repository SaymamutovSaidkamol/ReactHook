import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface categUpdate {
  name: string;
  id?: string;
}

const usePatchCateg = () => {
  return useMutation({
    mutationFn: (data: categUpdate) =>
      request
        .patch(`/products/${data.id}`, { name: data.name })
        .then((res) => res.data),
  });
};

export default usePatchCateg;
