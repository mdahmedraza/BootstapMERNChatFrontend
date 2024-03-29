import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from 'react-redux';
import {Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useLogoutUserMutation} from '../services/appApi';
import logo from '../assets/message.png';

function Navigation(){
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e){
      e.preventDefault();
      await logoutUser(user);
      window.location.replace('/');
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
            <LinkContainer to='/' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
              <Navbar.Brand>
                <img src={logo} alt="logo" style={{width: 50, height: 50}} />
                <p>Ahmed chat app</p>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/*<Nav className="me-auto"> //this is for nav in left side...*/}
              <Nav className="ms-auto">{/*//this is for nav in right side.... */}
                {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                {!user && (
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                )}
                <LinkContainer to='/chat'>
                  <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
                {user && (
                <NavDropdown title={
                  <>
                  <img src={user.pictrue} style={{width: 30, height: 30, marginRight: 10, objectFit: 'cover', borderRadius: '50%'}} />
                  {user.name}
                  </>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Button variant="danger" onClick={handleLogout}>Logout</Button>
                  </NavDropdown.Item>
                </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}
export default Navigation;