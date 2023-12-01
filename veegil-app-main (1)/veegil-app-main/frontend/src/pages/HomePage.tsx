import React from "react";
import Button from "../components/Button";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-red-600 font-bold text-3xl p-16">Landing Page</div>
      <div className="flex gap-x-4">
        <Button to="/register" label="CREATE A NEW ACCOUNT" />
        <Button to="/login" label="SIGN IN" />
      </div>
    </div>
  );
};

export default HomePage;
