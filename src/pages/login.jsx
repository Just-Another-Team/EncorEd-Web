import React from "react"
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import {Container, Row, Col, Form, InputGroup, Button, Stack} from 'react-bootstrap'
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";

const LoginPage = () => {
    
    const {register, handleSubmit} = useForm();
    

    const loggedIn = (data) => {
        console.log(data)
        try{
            axios.get('http://localhost:4000/user/valid', {
                email: data.email,
                password: data.password
            })
            console.log("login succesfully")
            window.location.href = 'dashboard/home'
        } catch(err) {
            console.log("err")
        }
        window.location.href = 'dashboard/home'
    }

    return ( 
        <Container fluid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, #45A1FD 0%, rgba(12, 99, 186, 0.85) 100%)', height: '100vh'}}>
            <Row style={{justifyContent:'center'}}>
                <Col lg={6}>
                    <Stack gap={2} style={{marginBottom: 32, alignItems: 'center'}}>
                        <img width={256} height={256} src='/assets/Logo.png' />
                        <h2 style={{textAlign: 'center', fontWeight: "bolder", color: '#A2D0FE'}}>Encor<span style={{color: '#FDB833'}}>Ed</span></h2>
                    </Stack>
                    
                    <Form onSubmit={handleSubmit(loggedIn)} style={{backgroundColor: '#A2D0FE', marginTop: 32, marginBottom: 32, padding: 36, display: "flex", flexDirection: 'column', gap: 16, borderRadius: 16}}>
                        <InputGroup>
                            <InputGroup.Text style={{border: '1px solid #FFF', backgroundColor: '#FFF'}}>
                                <AiOutlineMail />
                            </InputGroup.Text>
                            <Form.Control style={{border: '1px solid #FFF', boxShadow: "none"}} {...register("email")} type="email" placeholder="Email" name="email" />  
                        </InputGroup>

                        <InputGroup style={{marginBottom: 20}}>
                            <InputGroup.Text style={{border: '1px solid #FFF', backgroundColor: '#FFF'}}>
                                <AiOutlineLock />
                            </InputGroup.Text>
                            <Form.Control style={{border: '1px solid #FFF', boxShadow: "none"}} {...register("password")} type="password" placeholder="Password" name="password" />  
                        </InputGroup>

                        <InputGroup style={{justifyContent: 'center', marginTop: 20}}>
                            <Button style={{width: 320, fontWeight: "bolder", backgroundColor: '#296EB4', color: '#FDB833', borderColor: '#296EB4'}} type="submit">LOGIN</Button>
                        </InputGroup>
                    </Form>

                    <p style={{textAlign: 'center', marginTop: 32, color: '#FFFFFF'}}>Don't have an account? <a href="register" style={{color: '#FDB833',}}>Sign Up</a></p>
                </Col>  
            </Row>
        </Container>
    ) 
}
export default LoginPage