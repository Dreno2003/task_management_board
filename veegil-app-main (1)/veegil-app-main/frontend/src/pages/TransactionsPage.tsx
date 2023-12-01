import React, { useState, useEffect, useCallback } from "react";
import { Transaction, graphqlApi } from "../api/graphql";
import { useNavigate } from "react-router-dom";

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Deposit");
  const navigate = useNavigate();
  const fetchTransactions = useCallback(async () => {
    const response = await graphqlApi.transactions();
    if (response.data) {
      setTransactions(response.data.transactions);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchTransactions();
  }, [navigate, fetchTransactions]);

  const handleSubmit = async () => {
    const response = await graphqlApi.createTransaction({
      amount: Number(amount),
      type,
    });
    if (response.data) {
      setAmount("");
      fetchTransactions();
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="text-red-600 font-bold text-3xl p-16 w-full text-center">
        My Transactions
      </div>
      <div className="flex flex-wrap sm:flex-nowrap overflow-hidden">
        <div className="my-3 px-3 w-full overflow-hidden max-w-sm">
          <div className="flex flex-col space-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="shadow border rounded py-2 px-3 text-gray-700 mb-4"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="shadow border rounded py-2 px-3 text-gray-700 mb-4"
            >
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Transaction
            </button>
          </div>
        </div>
        <div className="my-3 px-3 w-full">
          <div className="overflow-x-auto">
            {transactions.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr>
                    <th className="border border-gray-600 px-4 py-2">ID</th>
                    <th className="border border-gray-600 px-4 py-2">Amount</th>
                    <th className="border border-gray-600 px-4 py-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="border border-gray-500 px-4 py-2">
                        {transaction.id}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        {transaction.amount}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        {transaction.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center p-4">
                Create transactions. They'll persist here even if you sign out
                and back in.
              </div>
            )}
          </div>
          <div className="text-center p-6">
            <a
              onClick={handleLogout}
              className="cursor-pointer text-red-600 hover:underline"
            >
              Click here to sign out.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
