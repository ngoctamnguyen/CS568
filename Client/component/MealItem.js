import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import Meal from '../pages/Meal';
import axios from "axios";
import { PrefContext } from '../context';
import "../App.css";

//import redux to get user role store in Redux
import { useSelector} from "react-redux";
import { selectUser} from "../features/userSlice";



export default function MealItem(meals, role) {
    const [delRecord, setDelRecord] = useState({ "isDelete": 'true' })

    const user = useSelector(selectUser);

    const [isAdmin, setisAdmin] = useState( user.role === 'admin' ? true : false);


    //soft delete => just update the field isDelete is true
    function softDelete(id, delRecord, e) {
        e.preventDefault();
        axios
            .put(`meals/${id}/delete`, delRecord)
            .then((res) => {
                if (res.status === 200) console.log("Delete successfull");//window.location.reload(false);
            })
            .catch((err) => {
                console.error(`Error while editing ${err}`);
            });
    }

    const { _id, name, price, rating, photo, discount } = meals.meals;

    function addCart() {
        console.log(name);
    }

    return (
        <>
            <div className="col-sm-3">
                <PrefContext.Consumer>
                    {(value) => (
                        <div className="card">
                            <img src={photo}
                                className="card-img-top" alt="food..." width={10} height={200} style={{ borderRadius: 400 / 2 }} />
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">Rating: {rating}</p>
                                <div className='cart'>
                                    {discount > 0 ? <label><s>Price: {price}</s></label> : <p className="card-text">Price: {price}</p>} {" "}
                                    {discount > 0 ? <label>discount: {price - discount}</label> : null}
                                </div>
                                
                                <div>
                                    
                                    {value.DetailOrReview ?
                                        <Link to={`/meals/${_id}`} element={<Meal />}>Detail</Link> :
                                        <Link to={`/meals/${_id}`} element={<Meal />}>Review</Link>} {" "}

                                    {isAdmin && <Link to={`/meals/${_id}/edit`} element={<Meal />}>edit</Link>} {" "}
                                    {isAdmin && <button style={{ border: 1 }} className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => softDelete(_id, delRecord, e)}>Delete</button>}
                                    {/* <button style={{ border: 1 }} className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={(e) => addCart()}>Add to cart</button> */}
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    )}
                </PrefContext.Consumer>

            </div>
        </>
    )
}