import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams, Outlet, Link } from "react-router-dom";

export default function Meal() {

    const { id } = useParams();
    const location = useLocation();
    const [meal, setMeal] = useState({
        name: "",
        detail: "",
        rating: "",
        price: "",
        photo: "",
        review: "",
    });

    const [isSuccess, setisSuccess] = useState(false);
    const [isDetail, setisDetail] = useState(false);
    const [isEdit, setisEdit] = useState(false);

    function save(meal, e) {
        console.log(meal)
        e.preventDefault()
        try {
            axios.post('http://localhost:8080/meals', meal)
                .then(() => {
                    setisSuccess(true);
                });
        } catch (e) {
            console.log(e);
        }
    }

    function edit(e) {
        e.preventDefault();
        axios
            .put('http://localhost:8080/meals/' + id, meal)
            .then((res) => {
                if (res.status === 200) setisSuccess(true);
            })
            .catch((err) => {
                console.error(`Error while editing ${err}`);
            });
    }


    function handleChanged(e) {
        setMeal({ ...meal, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        async function fetchMealDetails() {
            const res = await axios.get(`http://localhost:8080/meals/${id}`);
            setMeal(res.data);
            // if have id, it is may be edit or detail 
            setisEdit(location.pathname.includes("edit"));
            setisDetail(!location.pathname.includes("edit"));
        }
        console.log(id.length);
        if (id.length > 3) {
            console.log(id)
            fetchMealDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

                                            {isDetail ?
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Detail meal</p>
                                                : isEdit ?
                                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit meal</p>
                                                    : <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add new meal</p>}

                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control"
                                                            name="name"
                                                            value={meal.name}
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="name of meal..." />
                                                        <label className="form-label" htmlFor="floatingInput" style={{ color: "green" }}>Food name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">

                                                        {!isDetail ?
                                                            <input type="text" id="form3Example4cd" className="form-control"
                                                                name="photo"
                                                                value={meal.photo}
                                                                onChange={(e) => handleChanged(e)}
                                                                placeholder="photo..." /> :
                                                            <img src={meal.photo}
                                                                className="card-img-top" alt="food..." width={10} height={200} />
                                                        }
                                                        <label className="form-label" htmlFor="form3Example3c" style={{ color: "green" }}>Photo</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="number" id="form3Example4c" className="form-control"
                                                            name="price"
                                                            value={meal.price}
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="Price..." />
                                                        <label className="form-label" htmlFor="form3Example3c" style={{ color: "green" }}>Price</label>
                                                    </div>
                                                </div>

                                                {!isDetail ? <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <textarea
                                                            id="about"
                                                            className="form-control"
                                                            name="detail"
                                                            value={meal.detail}
                                                            cols="100"
                                                            rows="4"
                                                            onChange={(e) => handleChanged(e)}
                                                            placeholder="Detail..."
                                                        />
                                                        <label className="form-label" htmlFor="form3Example3c" style={{ color: "green" }}>Detail</label>
                                                    </div>
                                                </div> : null}

                                                {!isDetail && !isEdit && (

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="submit" className="btn btn-primary btn-lg" onClick={(e) => save(meal, e)}>Save meal</button>
                                                    </div>
                                                )}
                                                {isEdit && (
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="submit" className="btn btn-primary btn-lg" onClick={(e) => edit(e)}>Edit meal</button>
                                                    </div>

                                                )}

                                                {isSuccess && <div className="form-check d-flex justify-content-center mb-5">
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        <p style={{ color: "green" }}>Signup successfully!!!</p>
                                                        <Link to={`/meals`}>Back main page</Link>
                                                    </label>
                                                </div>}

                                                <Link to={`/meals`}>Back to main page</Link>

                                            </form>
                                            {isDetail && (
                                                <>
                                                    <Link to={`/meals/${id}/reviews`}>Detail</Link>

                                                    <Outlet />
                                                </>
                                            )}

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