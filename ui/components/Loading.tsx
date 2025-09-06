import React from "react";

interface LoadingProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  children: React.ReactNode;
}

const Loading = ({ width, height, children }: LoadingProps) => (
  <div
    style={{ width, height }}
    className="flex flex-col items-center justify-center p-10"
    data-cy="loading"
  >
    <p className="text-xs text-white animate-pulse">{children}</p>
  </div>
);

export default Loading;
