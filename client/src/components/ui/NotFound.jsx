import React from "react";
import notfound from "../../assets/images/notfound.png";

const NotFound = () => {
  return (
    <div className="flex justify-center my-24 md:mt-0">
      <img src={notfound} alt="not found page" className="object-fit-cover" />
    </div>
  );
};

export default NotFound;
