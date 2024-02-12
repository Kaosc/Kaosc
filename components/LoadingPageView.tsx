import React from "react";
import ActivityIndicator from "@/components/ui/indicator/ActivityIndicator";

export default function LoadingPageView() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ActivityIndicator />
    </div>
  );
}
