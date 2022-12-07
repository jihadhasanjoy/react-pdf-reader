import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import React = require("react");

export default function CategoryList(data) {
  const { category } = useParams();
  const [post, SetPost] = useState({});
  const { push } = useHistory();

  useEffect(() => {
    console.log(category);
  }, []);

  return (
    <>
      <div className="d">
        <button onClick={() => push("/")}>Go back</button>
        <h4>Category</h4>
      </div>
    </>
  );
}
