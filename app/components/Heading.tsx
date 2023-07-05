"use client";

import React from "react";

interface HeadingProps {
  title: string;
  subTitle?: string;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, isCenter, subTitle }) => {
  return (
    <div className={isCenter ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
    </div>
  );
};

export default Heading;
