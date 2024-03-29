import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css';
import {Link, useNavigate} from 'react-router-dom';
import botImg from '../assets/robot.png';
import {useSignupUserMutation} from '../services/appApi';

function Signup(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [name, setName]=useState('');
    const [signupUser, {isLoading, error}] = useSignupUserMutation();
    const navigate = useNavigate();
    // image upload states...
    const [image, setImage]=useState(null);
    const [uploadImg, setUploadImg]=useState(false);
    const [imagePreview, setImagePreview]=useState(null);

    function validateImg(e){
        const file = e.target.files[0];
        if(file.size >= 1048756){
            return alert("max file size is 1mb");
        }else{
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }
    function handleSignup(e){
        e.preventDefault();
        signupUser({name, email, password}).then(({data})=>{
            if(data){
                navigate('/login')
            }
        })
    }
    return(
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                <Form style={{width: "80%", maxWidth: 500}} onSubmit={handleSignup}>
                    <h1 className="text-center">Create account</h1>
                    <div className="signup-profile-pic__container">
                        <img src={imagePreview || botImg} className="signup-profile-pic" alt="al;sjkd" />
                        <label htmlFor="image-upload" className="image-upload-label">
                            <i className="fas fa-plus-circle add-picture-icon"></i>
                        </label>
                        <input type="file" id="image-upload" hidden accept="image/png, image/jpg, image/jpeg" onChange={validateImg} />
                    </div>
                    {error && <p className='alert alert-danger'>{error.data}</p>}
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="your name" onChange={(e)=>setName(e.target.value)} value={name} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                         <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {isLoading?'signining you up...':'signup'}
                    </Button>
                    <div className="py-4">
                        Already have an Account? <Link to='/login'>Login</Link>
                    </div>
                </Form>
                </Col>
                <Col md={5} className="signup__bg">

                </Col>
            </Row>
        </Container>
    )
}
export default Signup;