"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import SchoolContext from "@/context/SchoolContext";

const IndexPage: React.FC = () => {
  const schoolContext = useContext(SchoolContext);
  const router = useRouter();

  useEffect(() => {
    if (schoolContext?.school === null) {
      router.replace("/auth/login");
    } else {
      router.replace("/fleet/routes");
    }
  }, [schoolContext, router]);

  return <div>Loading</div>;
};

export default IndexPage;
