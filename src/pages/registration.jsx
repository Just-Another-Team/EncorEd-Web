import React from "react"
import {AiOutlineMail, AiOutlineLock, AiOutlineUser} from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import {Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap'


const RegistrationPage = () => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm()

    const submitRegister = (data) => {
        console.log(data)
    }

    const inputs = [
        {name: 'firstName', placeholder: 'First name', type: 'text', icon: <AiOutlineUser />},
        {name: 'lastName', placeholder: 'Last name', type: 'text', icon: <AiOutlineUser />},
        {name: 'email', placeholder: 'Email', type: 'email', icon: <AiOutlineMail />},
        {name: 'password', placeholder: 'Password', type: 'password', icon: <AiOutlineLock />},
        {name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password', icon: <AiOutlineLock />},
    ]

    return (
        <Container style={{paddingTop: 64}}>
            <Row style={{justifyContent:'center'}}>
                <Col lg={6}>

                    <Form onSubmit={handleSubmit(submitRegister)} style={{backgroundColor: '#A2D0FE', marginTop: 32, marginBottom: 32, padding: 36, display: "flex", flexDirection: 'column', gap: 16, borderRadius: 16}}>
                        <Form.Text>
                            <h4 style={{textAlign: 'center', fontWeight: '700', color: '#296EB4'}}>CREATE ACCOUNT</h4>
                        </Form.Text>
                        
                        {inputs.map((el, ind) => (
                            <Form.Group>
                                <InputGroup key={el.name}>
                                    <InputGroup.Text style={{border: '1px solid #FFF', backgroundColor: '#FFF'}}>
                                        {el.icon}
                                    </InputGroup.Text>
                                    <Form.Control style={{border: '1px solid #FFF', boxShadow: "none"}} {...register(el.name)} type={el.type} placeholder={el.placeholder} />  
                                    <Form.Control.Feedback type="invalid">Hello World!</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        ))}

                        <InputGroup>
                            <Form.Check>
                                <Form.Check.Input type="checkbox"/>
                                <Form.Check.Label>Agree to the <a href="">Terms and Conditions</a></Form.Check.Label>
                            </Form.Check>
                        </InputGroup>

                        <InputGroup style={{justifyContent: 'center', marginTop: 20}}>
                            <Button style={{width: 320, fontWeight: "bolder", backgroundColor: '#296EB4', color: '#FDB833', borderColor: '#296EB4'}} onClick={() => reset()} type="submit">SUBMIT</Button>
                        </InputGroup>
                    </Form>

                    <p style={{textAlign: 'center', marginTop: 32, color: '#FFFFFF'}}>Already have an account? <a href="/" style={{color: '#FDB833'}}>Sign In</a></p>
                </Col>  
            </Row>
        </Container>
    ) 
}
export default RegistrationPage