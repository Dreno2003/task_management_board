import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { graphqlApi } from "../api/graphql";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await graphqlApi.login({ email, passphrase });
    if (response.data) {
      console.log(response.data);
      alert("User logged in successfully. Click OK to continue to transactions page.");
      localStorage.setItem("accessToken", response.data.login.accessToken);
      navigate("/transactions");
    } else {
      if (
        response.errors &&
        response.errors[0].extensions?.originalError?.message[0]
      ) {
        alert(response.errors.map((e) => e.extensions?.originalError?.message.join("\n")).join("\n"));
      } else alert(response.errors?.map((e) => e.message).join("\n"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-red-600 font-bold text-3xl p-16">Sign In</div>
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Passphrase"
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
      <div className="py-8">
        <p>Don't have an account?</p>
        <a href="/register" className="text-blue-500 hover:text-blue-800">
          Register
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
