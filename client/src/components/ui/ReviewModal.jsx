import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reviewText || rating === 0) {
      alert("Please provide both rating and review text!");
      return;
    }

    onSubmit({
      id: Date.now(),
      rating,
      text: reviewText,
      date: new Date().toLocaleDateString(),
    });

    setRating(0);
    setReviewText("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 cursor-pointer right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Write Your Review
        </h3>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          rows="4"
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 cursor-pointer hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-green-600 cursor-pointer text-white font-medium rounded-lg hover:bg-green-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
