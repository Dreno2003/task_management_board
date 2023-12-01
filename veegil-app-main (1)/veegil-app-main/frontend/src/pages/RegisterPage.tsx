import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { graphqlApi } from "../api/graphql";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await graphqlApi.registerUser({ name, email, passphrase });

    if (response.data) {
      alert("User registered successfully.")
      navigate("/login");
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
      <div className="text-red-600 font-bold text-3xl p-16">Registration</div>
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <FormInput
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Register
        </button>
      </form>
      <div className="py-8">
        <p>Already have an account?</p>
        <a href="/login" className="text-blue-500 hover:text-blue-800">
          Login
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
