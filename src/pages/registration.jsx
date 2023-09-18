import React, { useRef, useState, useEffect } from "react"
import {AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlineCalendar} from 'react-icons/ai'
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form'
import { Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap'
import axios from "axios"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase.js"

const RegistrationPage = () => {

    const {register, control, reset, handleSubmit, formState: {errors}, watch, getValues, trigger} = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            passwordConfirm: ""
        }
    })

    //console.log(data)
    const submitRegister = (data) => {
        try{
            axios.put('http://localhost:4000/user/verify', {
                email: data.email
            })
            .then(() => {
                axios.post('http://localhost:4000/user/add', {
                firstName: data.firstName,   
                lastName: data.lastName,
                username: data.firstName + "" + data.lastName,
                email: data.email,
                password: data.password,
                isadmin: "false",
                isalumni: "false",
                status: "open",
                })
                
                console.log("Success")
                reset()
                //window.location.href = '/'
            })
            .catch(error => {
                console.log(error)
            })
            //window.location.href = '/'
        } catch(err) {
            console.log("err")
        }
    }

    const handleErrors = (name) => {
        if (name === 'firstName') return errors.firstName
        if (name === 'lastName') return errors.lastName
        if (name === 'email') return errors.email
        if (name === 'password') return errors.password
        if (name === 'passwordConfirm') return errors.passwordConfirm
    }

    const inputs = [
        {name: 'firstName', placeholder: 'First name', type: 'text', icon: <AiOutlineUser />, requiredErrorMessage: "First name is required"},
        {name: 'lastName', placeholder: 'Last name', type: 'text', icon: <AiOutlineUser />, requiredErrorMessage: "Last name is required"},
        {name: 'email', placeholder: 'Email', type: 'email', icon: <AiOutlineMail />, requiredErrorMessage: "Email is required"},
        {name: 'password', placeholder: 'Password', type: 'password', icon: <AiOutlineLock />, requiredErrorMessage: "Password is required", minLength: {value: 8, message: "Password must not be less than 8 characters"}},
    ]

    const cPass = {
        name: 'passwordConfirm', 
        placeholder: 'Confirm Password',
        type: 'password', 
        icon: <AiOutlineLock />,
        }

    const password = watch("password" && "passwordConfirm");
        useEffect(() => {
        trigger("passwordConfirm");
    }, [password, trigger]);

    return (
        <Container
        fluid
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            background: 'linear-gradient(135deg, #45A1FD 0%, rgba(12, 99, 186, 0.85) 100%)',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}>
            <Row style={{justifyContent:'center'}}>
                <Col lg={6}>

                    <Form onSubmit={handleSubmit(submitRegister)} style={{backgroundColor: '#A2D0FE', marginTop: 32, marginBottom: 32, padding: 36, display: "flex", flexDirection: 'column', gap: 16, borderRadius: 16}}>
                        <Form.Text>
                            <h4 style={{textAlign: 'center', fontWeight: '700', color: '#296EB4'}}>CREATE ACCOUNT</h4>
                        </Form.Text>
                        
                        {inputs.map((el, ind) => (
                            <Form.Group>
                                <InputGroup key={el.name}>
                                    <InputGroup.Text style={{backgroundColor: '#FFF'}}>
                                        {el.icon}
                                    </InputGroup.Text>
                                    <Form.Control
                                    isInvalid={handleErrors(el.name)}
                                    style={{ boxShadow: "none"}}
                                    {...register(el.name, {
                                        required: el.requiredErrorMessage,
                                        minLength: el.minLength,
                                    })}
                                    type={el.type}
                                    placeholder={el.placeholder}
                                    />
                                    <Form.Control.Feedback type="invalid">{handleErrors(el.name)?.message}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        ))}
                            <InputGroup key={cPass.name}>
                                <InputGroup.Text style={{ backgroundColor: '#FFF' }}>
                                    {cPass.icon}
                                </InputGroup.Text>
                                <Form.Control
                                    isInvalid={handleErrors(cPass.name)}
                                    style={{ boxShadow: "none" }}
                                    type={cPass.type}
                                    placeholder={cPass.placeholder}
                                    {...register(cPass.name, {
                                        required: cPass.requiredErrorMessage,
                                        minLength: cPass.minLength,
                                        validate: (value) => {
                                            const { password } = getValues();
                                            return password === value || "Passwords do not match"
                                        },
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">{handleErrors(cPass.name)?.message}</Form.Control.Feedback>
                            </InputGroup>
                        <InputGroup>
                            <Form.Check>
                                <Form.Check.Input type="checkbox" required={true}/>
                                <Form.Check.Label>Agree to the <a href="">Terms and Conditions</a></Form.Check.Label>
                            </Form.Check>
                        </InputGroup>

                        <InputGroup style={{justifyContent: 'center', marginTop: 20}}>
                            <Button style={{width: 320, fontWeight: "bolder", backgroundColor: '#296EB4', color: '#FDB833', borderColor: '#296EB4'}} type="submit">SUBMIT</Button>
                        </InputGroup>
                    </Form>

                    <p style={{textAlign: 'center', marginTop: 32, color: '#FFFFFF'}}>Already have an account? <a href="/" style={{color: '#FDB833'}}>Sign In</a></p>
                </Col>  
            </Row>
        </Container>
    ) 
}
export default RegistrationPage