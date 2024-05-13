import {
    Typography,
    Container,
    Box,
    Stack,
    Button,
    Paper,
} from "@mui/material";
import Form from "../../components/Form";
import { useForm, FieldValues } from "react-hook-form";
import ControlledTextField from "../../components/TextFieldControlled/input";
import { LoginDataType, LoginTextFieldType } from "../../types/InputLoginType";
import LoadingDialog from "../../components/DialogLoading";
import { AuthErrorCodes } from "firebase/auth"
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import DialogMessage from "../../components/DialogMessage";

const inputs: Array<LoginTextFieldType> = [
    {
        name: "email",
        label: "Email",
        rules: {
            required: "Email is required",
        },
        type: "email"
    },
    {
        name: "password",
        label: "Password",
        rules: {
            required: "Password is required"
        },
        type: "password",
    }
]

const Login = () => {
    const { load, error, closeError, login } = useAuth();
    const [openLoading, setOpenLoading] = useState<boolean>(false);

    const {handleSubmit, setError, control} = useForm<LoginDataType>({
        defaultValues: {
            email: null,
            password: null,
        }
    });

    const handleLoginError = (error: any) => {
        setOpenLoading(false);

        if (error instanceof FirebaseError) {
            console.error(error)

            if (error.code === AuthErrorCodes.INVALID_PASSWORD) setError('password', { type: "Firebase Auth", message: "Invalid Password" } )
            else if (error.code === AuthErrorCodes.USER_DELETED) setError('email', { type: "Firebase Auth", message: "Invalid email" } )
        }
    }

    const handleLogin = async (loginData: LoginDataType) => {
        setOpenLoading(true);
        // await signInWithEmailAndPassword(getAuth(), loginData.email!, loginData.password!)
        //     .then(() => {
        //         setOpenLoading(false);
        //     })
        //     .catch(handleLoginError)
        await login(loginData.email!, loginData.password!)
            .then(() => {
                setOpenLoading(false);
            })
            .catch(handleLoginError)
    }

    return (
        <Container
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: 560,
        }}>
            <Paper
            component={Box}
            maxWidth={512}
            padding={4}>
                <Form onSubmit={handleSubmit(handleLogin)}>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={2}>
                        <img width={96} height={96} src="/assets/Logo.png" />
                        <Typography variant="h4" fontWeight={700}>Encor<span>Ed</span></Typography>
                    </Box>

                    <Typography
                    variant="h6"
                    fontWeight={700}>
                        SIGN IN
                    </Typography>

                    {inputs.map((input) => (
                        <ControlledTextField
                        key={input.name}
                        name={input.name}
                        control={control}
                        rules={input.rules}
                        label={input.label}
                        type={input.type}
                        size="small"
                        fullWidth/>
                    ))}

                    <Stack
                    direction={"row"}
                    marginTop={1}>
                        <Button
                        type="submit"
                        variant="contained"
                        size="large">
                            SIGN IN
                        </Button>
                    </Stack>
                </Form>
            </Paper>

            {/* TO-DO:
            For first time logging in:
            Prompt the user in entering their email. After that, send an email to generate a password.
            It must be connected to the MAC Address so that it wouldn't repeat itself! */}

            <LoadingDialog
            open={openLoading || load}
            text="Logging in to EncorEd"/>

            {/* Error Dialog */}
            <DialogMessage
            title="Error when logging in"
            open={error.isError}>
                <DialogMessage.Body>
                    <DialogMessage.Text content={error.message} />
                </DialogMessage.Body>
                <DialogMessage.Footer>
                    <Button onClick={() => closeError()}>OKAY</Button>
                </DialogMessage.Footer>
            </DialogMessage>


        </Container>
    )
}

export default Login;