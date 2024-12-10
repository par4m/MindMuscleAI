import React from "react";
import Link from "next/link";
import LoginRedirect from "@/components/ui/loginRedirect";

export default function Home() {
  LoginRedirect();
  return (
    <div className="hero min-h-screen">
      <div className={"hero-content text-left p-10 place-content-center"}>
        <div className={"max-w-md"}>
          <p className={"font-bebas text-4xl leading-relaxed"}>
            Your fitness journey just got easier
          </p>
          <p className={"font-bebas text-3xl "}>Discover the power of</p>
          <div className={"text-6xl leading-relaxed"}>
            <span className={"font-thin font-lato"}>Mind</span>
            <span className={"font-bebas text-primary"}>Muscle AI</span>
          </div>
          <p className={"font-bebas text-3xl leading-relaxed"}>
            for personalized routines and seamless tracking
          </p>
          {/* center button */}
          <div className={"flex justify-center py-4"}>
            <Link href={"/coach/signup"} className={"pb-4"}>
              <button className={"btn btn-primary btn-lg px-24 "}>
                Register{" "}
              </button>
            </Link>
          </div>
          <Link
            href={"/login"}
            className={"text-3xl font-bebas flex justify-center link-primary"}
          >
            Login!{" "}
          </Link>

          <Link
            className="flex font-lato justify-center font-bold py-10"
            href={"https://paramarora.com"}
          >
            Copyright © 2024 Param Arora - All Rights Reserved.
          </Link>
        </div>
      </div>
    </div>
  );
}
