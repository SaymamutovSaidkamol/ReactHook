import { useMutation } from "@tanstack/react-query"
import { request } from "../../../config/request"

interface loginData {
    email: string
    password: string
}


export const useLogin = () => {
    return useMutation({
        mutationFn: (data: loginData) => request.post("/auth/login", data).then((res) => res.data)
    })
}