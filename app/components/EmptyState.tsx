"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  isShowReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact mathes",
  subtitle = "Try changing or removing some of your filters",
  isShowReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading isCenter title={title} subTitle={subtitle} />
      <div className="w-48 mt-4">
        {isShowReset && (
          <Button
            isOutline
            label="Remove filter"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
export default EmptyState;
