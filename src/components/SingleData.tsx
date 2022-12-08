import { useEffect } from "react";
import { useParams } from "react-router-dom";
import React = require("react");

export default function SingleData() {
  const { id } = useParams();

  console.log(id, "param id");
  useEffect(() => {
    console.log("Single Data");
  }, []);

  return <div className="d">Single Data</div>;
}
