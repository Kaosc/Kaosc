import React from "react";
import ActivityIndicator from "@/components/ui/indicator/ActivityIndicator";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ActivityIndicator />
    </div>
  );
}
