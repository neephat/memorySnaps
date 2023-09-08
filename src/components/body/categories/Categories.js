import React from "react";
import { connect } from "react-redux";
import { filterImages } from "../../../redux/actionCreators";
import "../categories/categories.css";
const mapDispatchToProps = (dispatch) => {
  return {
    filterImages: (category) => () => {
      dispatch(filterImages(category));
    },
  };
};

const Categories = (props) => {
  return (
    <div>
      <div className="menu-tabs">
        <div className="menu-tab pt-4 d-flex justify-content-around">
          <button
            className="btn catBtn"
            onClick={props.filterImages("all")}
            style={{ fontWeight: "bold" }}
          >
            All
          </button>
          <button
            className="btn catBtn"
            onClick={props.filterImages("photo")}
            style={{ fontWeight: "bold" }}
          >
            Photo
          </button>
          <button
            className="btn catBtn"
            onClick={props.filterImages("illustration")}
            style={{ fontWeight: "bold" }}
          >
            Illustration
          </button>
          <button
            className="btn catBtn"
            onClick={props.filterImages("vector")}
            style={{ fontWeight: "bold" }}
          >
            Vector
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Categories);
