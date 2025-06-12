import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

type FieldType = {
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  colorIds: string[];
  createdAt: string;
};

const useCreateCateg = () => {
  return useMutation({
    mutationFn: (data: FieldType) =>
      request.post("/products", data).then((res) => res.data),
  });
};

export default useCreateCateg;
