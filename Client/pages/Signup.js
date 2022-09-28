import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [success, setSuccess] = useState(false);
    const [isSignup, setisSignup] = useState(true);
    const [newUser, setNewUser] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        tel: "",
        roll: "user"
    });

    function checkInfo(newUser, e) {
        e.preventDefault()
        console.log(newUser);
        try {
            axios.post('http://localhost:8080/users', newUser)
                .then(() => {
                    setSuccess(true);
                    setisSignup(false);
                });
        } catch (e) {
            console.log(e);
        }
    }

    function cleanForm() {
        setNewUser({
            name: "",
            username: "",
            password: "",
            email: "",
            tel: "",
        })
    }

    function handleChanged(e) {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    return (
        <>

            <section className="vh-100" >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black">
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <form className="mx-1 mx-md-4" onSubmit={(e) => checkInfo(newUser, e)}>

                                                {isSignup && <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control"
                                                            name="name"
                                                            // value={newUser.name}
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="Your full name..." />
                                                    </div>
                                                </div>}


                                                {isSignup && <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example3c" className="form-control"
                                                            name="username"
                                                            // value={newUser.username}
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="username..." />
                                                        {/* <label className="form-label" htmlFor="form3Example3c">Your Email</label> */}
                                                    </div>
                                                </div>}

                                                {isSignup && <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control"
                                                            name="password"
                                                            // value={newUser.password}
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="Password..." />
                                                    </div>
                                                </div>}

                                                {isSignup && <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example4cd" className="form-control"
                                                            name="email"
                                                            // value={newUser.email}
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="Email..." />

                                                    </div>
                                                </div>}

                                                {isSignup && <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="tel" id="tel" className="form-control"
                                                            name="tel"
                                                            // value={newUser.tel}
                                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                            required
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="123-456-7890" />

                                                    </div>
                                                </div>}

                                        
                                                {isSignup && <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>}

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        {success && <p>Signup successfully!!!</p>}
                                                        <Link to={`/login`}>Back to login</Link>
                                                    </label>
                                                </div>

                                                {isSignup && <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg" onClick={{ cleanForm }}>Register</button>
                                                </div>}

                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            {success ?
                                                <img src="https://as2.ftcdn.net/v2/jpg/02/04/09/35/500_F_204093587_GIIEPK2zm7hQPsrEur95A6xKo6J9vlJ1.jpg"
                                                    className="img-fluid" alt="signup" /> :
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                    className="img-fluid" alt="welcome" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}