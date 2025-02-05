import React, { useState } from "react";
import "./RatingFeedback.css";

const RatingFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="rating-feedback">
      <p>Was this response helpful?</p>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`star ${star <= (hover || rating) ? "filled" : ""}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09L5.5 12.545 1 8.91l6.061-.892L10 2.5l2.939 5.518L19 8.91l-4.5 3.636L15.878 18z" />
          </svg>
        ))}
      </div>
      {rating > 0 && (
        <p className="rating-confirmation">
          You rated this response {rating} star{rating > 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
};

export default RatingFeedback;
