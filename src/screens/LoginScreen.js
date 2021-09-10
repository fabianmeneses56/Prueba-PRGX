import React from 'react'
import { TextField,Button } from '@material-ui/core';
import  '../styles/LoginScreen.css'
export const LoginScreen = () => {
return (
    <div   className="Container">
        <section className="sectionContainer">
        <TextField id="standard-basic" label="Email" />
        <TextField className="FieldMargin" id="standard-basic" label="Password" />
        <article className="ButtonsContainer">
    
        <Button variant="contained" size="small" color="primary" className="WithButton" onClick={() => { alert('pulsado') }}>
            Login
            </Button>
        <Button variant="contained" size="small" color="primary" className="WithButton">
            Signup
            </Button>
        </article>
        </section>
        <footer className="FooterContainer">
            <h3 className="textFooter">Footer</h3>
        </footer>
        </div>
)
}
