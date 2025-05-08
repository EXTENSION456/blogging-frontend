import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function NewDocumentButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/create");
  };

  return (
    <div>
      <Button className="cursor-pointer" onClick={handleClick}>
        New Document
      </Button>
    </div>
  );
}
