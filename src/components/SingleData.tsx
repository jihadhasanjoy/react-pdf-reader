import * as React from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function SingleData() {
  const { id } = useParams();
  const location = useLocation();
  console.log(id, "param id");
  useEffect(() => {
    console.log("Single Data");
  }, []);

  return ( 
    <div className="d">
      <h1>Success</h1>
      <h3>
       Found Path <code>{location.pathname}</code>
      </h3>
      <Link
        to={`/`}
      >
        Go Back
      </Link>
    </div>
  );
}
