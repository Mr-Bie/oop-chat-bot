import React from 'react';

type LoadingProps = {
  overlay?: boolean;
};

const Loading: React.FC = ({ overlay = true }: LoadingProps) => {
  return (
    <>
      {overlay ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-50 z-50">
          <LoadingAnimation />
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

const LoadingAnimation = () => (
  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
);

export default Loading;
