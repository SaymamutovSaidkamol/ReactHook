import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

type FieldType = {
  name: string;
  typeId: string;
};

const useCreateCateg = () => {
  return useMutation({
    mutationFn: (data: FieldType) =>
      request.post("/category", data).then((res) => res.data),
  });
};

export default useCreateCateg;
