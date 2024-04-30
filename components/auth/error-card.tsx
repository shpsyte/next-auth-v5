import React from "react";
import CardWrapper from "./card-wrapper";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops, something went wrong!"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <FaExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
}
