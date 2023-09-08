import React, { Component } from 'react';
import { Formik} from 'formik';
import { connect } from 'react-redux';
import { auth } from '../../redux/authActionCreators'
import Loading from '../body/Loading';
import { Alert } from 'reactstrap';

const mapStateToProps = (state)=>{
    return {
        authLoading: state.auth.authLoading,
        authFailedMsg: state.auth.authFailedMsg
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        auth: (email, password, mode)=> dispatch(auth(email, password, mode))
    }
}


class Auth extends Component {
    state = {
        mode: "Sign Up"
        
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"})
    }

    render() {
        let errr = null;
        if(this.props.authFailedMsg !== null){
            errr = <Alert color='danger'>{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if(this.props.authLoading){
            form = <Loading />
        }else{
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }

                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode)
                        }
                    }

                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 4) {
                            errors.password = 'Must be atleast 4 characters!';
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = 'Password field does no match!';
                            }
                        }
                        //console.log("Errors:", errors)
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{minHeight: "85vh"}}className='mx-auto'>
                            <button className="btn btn-info btn-md fw-bolder mb-3" onClick={this.switchModeHandler}>Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                            <form className='mx-auto' style={{width: "50%", border: "1px grey solid", padding: "15px", borderRadius: "7px",}} onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.email}</span>
                                
                                <br />
                                <input
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.password}</span>
                                <br />

                                {this.state.mode === "Sign Up" ? <div>
                                    <input
                                        name="passwordConfirm"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                    />
                                    <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                                    <br />
                                </div> : null}

                                <button type="submit" className="btn btn-success fw-bolder">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                            </form>
                        </div>)}
                </Formik>
            )
        }
        return (
            <div>
                {errr}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Auth);