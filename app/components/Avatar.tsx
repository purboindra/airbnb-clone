"use client";

import Image from "next/image";
import React from "react";

interface AvatarProps {
  imageUrl?: string | null;
}

export const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
      src={imageUrl ? imageUrl : "/images/placeholder.jpeg"}
    />
  );
};
