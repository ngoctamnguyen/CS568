import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/meals/${id}/reviews`);
      setReviews(res.data);
      console.log(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
        <li>{reviews.detail}</li>
        <li>{reviews.review}</li>
    </ul>

  );
}