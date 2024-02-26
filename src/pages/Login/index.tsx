import {
    Typography,
    Container,
    Box,
    Stack,
    Button,
    Paper,
} from "@mui/material";
// import LoginUserForm from "../../components/Forms/Formhooks/UserForm-Login-Hooks";
import { useAppSelector } from "../../app/encored-store-hooks";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/TextFieldControlled/input";
import { LoginDataType, LoginTextFieldType } from "../../types/InputLoginType";
import LoadingDialog from "../../components/DialogLoading";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    const {handleSubmit, control} = useForm<LoginDataType>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = (loginData: LoginDataType) => {
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
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
            open={false}
            text="Logging in to EncorEd"/>
        </Container>
    )
}

export default Login;