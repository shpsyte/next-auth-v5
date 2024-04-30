"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "../form-success";
import FormError from "../form-error";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [stateToken, setStateToken] = useState<
    {
      sucess?: string;
      error?: string;
    } | null
  >(null);

  const onSubmit = useCallback(async () => {
    if (stateToken?.sucess || stateToken?.error) {
      return;
    }
    if (!token) {
      return;
    }

    try {
      const resp = await newVerification(token);
      if (resp?.error) {
        setStateToken({ error: resp.error });
      } else {
        setStateToken({ sucess: resp?.sucess || "Verification successful" });
      }
    } catch {
      setStateToken({ error: "Something went wrong" });
    }

    return () => {
      setStateToken(null);
    };
  }, [stateToken?.error, stateToken?.sucess, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <CardWrapper
        headerLabel="New Verification"
        backButtonLabel="Back"
        backButtonHref="/auth/login"
      >
        <div className="flex items-center w-full justify-center flex-col">
          <BeatLoader
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <FormSuccess message={stateToken?.sucess} />
          <FormError message={stateToken?.error} />
        </div>
      </CardWrapper>
    </>
  );
}
