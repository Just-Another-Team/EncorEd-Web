import { TextFieldProps } from "@mui/material";
import { FieldValues, RegisterOptions } from "react-hook-form";

export type LoginDataType = {
    email: string;
    password: string;
}

export type LoginTextFieldType = {
    name: string,
    label: string,
    rules: Omit<RegisterOptions<LoginDataType, any>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">,

    type?: "email" | "password"
}