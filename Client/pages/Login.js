import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//import redux
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

export default function Login() {

    const navigate = useNavigate();

    const [userRole, setUserRole] = useState("");
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: "",
    });
    const [errMessage, setErrMessage] = useState("")

    const dispatch = useDispatch();

    async function checkInfo(loginUser, e) {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8080/login', loginUser)
                .then((result) => {
                    setRoll(loginUser, e);
                    sessionStorage.setItem("accessToken", result.data.data.accessToken);
                    // window.location = "http://localhost:3000/meals";
                });
        } catch (err) {
            console.log(err.response.data.message);
            setErrMessage(err.response.data.message);
        }
    }
    async function setRoll(loginUser, e) {
        e.preventDefault()
        const res = await axios.get('http://localhost:8080/login/' + loginUser.username);

        dispatch(login({
            username: res.data[0].username,
            role: res.data[0].role,
        })
        );
        
        navigate("/meals");
        // const role = res.data[0].role;
        // localStorage.setItem("myRoll", role);
        // setUserRole(role);
        // window.location = "http://localhost:3000/meals";
    }

    function cleanForm() {

    }

    function handleChanged(e) {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });

    }

    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://c8.alamy.com/comp/2GNWF53/vietnamese-cuisine-vector-prawn-soup-pho-shiitake-mushroom-soup-pho-or-vegetable-lamb-salad-beef-noodle-soup-pho-bo-spinach-prawn-salad-eggplant-stew-and-shrimp-salad-vietnam-food-cartoon-poster-2GNWF53.jpg"
                                className="img-fluid"
                                alt="Sample..."
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={(e) => checkInfo(loginUser, e)}>
                                {/* <!-- Username input --> */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="username"
                                        id="floatingInput"
                                        className="form-control form-control-lg"
                                        name="username"
                                        value={loginUser.username}
                                        onChange={(e) => handleChanged(e)}
                                        placeholder="Enter a valid name"
                                    />
                                    <label className="form-label" htmlFor="floatingInput">Username</label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="floatingPassword"
                                        className="form-control form-control-lg"
                                        name="password"
                                        value={loginUser.password}
                                        onChange={(e) => handleChanged(e)}
                                        placeholder="Enter password"
                                    />
                                    <label className="form-label" htmlFor="floatingPassword"
                                    >Password</label
                                    >
                                </div>
                                <p className="link-danger" id="error"></p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        // style={"padding-left: 2.5rem; padding-right: 2.5rem"}
                                        id="signinBtn"
                                        onClick={(e) => cleanForm}
                                    >
                                        Login
                                    </button>
                                    {" "}{errMessage}
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account? {" "}
                                        <Link to="/signup" >Register</Link>
                                    </p>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary"
                >
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2022. All rights reserved.
                    </div>
                    {/* <!-- Copyright --> */}
                </div>
            </section>

        </>
    )
}