import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaDollarSign, FaRegCommentDots, FaWallet } from "react-icons/fa";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateTransactionAPI } from "../../services/transactions/transactionServices";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
  type: Yup.string().required("Transaction type is required").oneOf(["income", "expense"]),
  category: Yup.string().required("Category is required"),
  description: Yup.string().optional(),
});

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateTransactionAPI,
    mutationKey: ["update-transaction"],
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
      type: "",
      category: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = { ...values, id };
      try {
        await mutateAsync(data);
        navigate("/transactions");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Update Transaction</h2>
        <p className="text-gray-600">Modify the details below.</p>
      </div>

      {isError && <AlertMessage type="error" message={error?.response?.data?.message || "Something went wrong!"} />}
      {isSuccess && <AlertMessage type="success" message="Transaction updated successfully, redirecting..." />}

      {/* Amount */}
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-gray-700 font-medium">
          <FaDollarSign className="inline mr-2 text-blue-500" />
          Amount
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Enter amount"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-500 text-xs italic">{formik.errors.amount}</p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label htmlFor="type" className="flex gap-2 items-center text-gray-700 font-medium">
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label htmlFor="category" className="text-gray-700 font-medium">
          Category
        </label>
        <input
          type="text"
          {...formik.getFieldProps("category")}
          id="category"
          placeholder="Enter category"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-xs italic">{formik.errors.category}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label htmlFor="description" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Description
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Optional description"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
      >
        Update Transaction
      </button>
    </form>
  );
};

export default UpdateTransaction;
