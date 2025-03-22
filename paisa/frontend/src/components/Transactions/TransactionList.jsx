// // import React, { useState } from "react";
// // import { useMutation, useQuery } from "@tanstack/react-query";
// // import { FaTrash, FaEdit } from "react-icons/fa";

// // import { ChevronDownIcon } from "@heroicons/react/24/solid";
// // import { listTransactionsAPI } from "../../services/transactions/transactionServices";
// // import { listCategoriesAPI } from "../../services/category/categoryServices";


// // const TransactionList = () => {
// //   //!Filtering state
// //   const [filters, setFilters] = useState({
// //     startDate: "",
// //     endDate: "",
// //     type: "",
// //     category: "",
// //   });
// //   //!Handle Filter Change
// //   const handleFilterChange = (e) => {
// //     const { name, value } = e.target;
// //     setFilters((prev) => ({ ...prev, [name]: value }));
// //   };

// //   //fetching
// //   const {
// //     data: categoriesData,
// //     isLoading: categoryLoading,
// //     error: categoryErr,
// //   } = useQuery({
// //     queryFn: listCategoriesAPI,
// //     queryKey: ["list-categories"],
// //   });
// //   //fetching
// //   const {
// //     data: transactions,
// //     isError,
// //     isLoading,
// //     isFetched,
// //     error,
// //     refetch,
// //   } = useQuery({
// //     queryFn: () => listTransactionsAPI(filters),
// //     queryKey: ["list-transactions", filters],
// //   });


  

// //   return (
// //     <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         {/* Start Date */}
// //         <input
// //           type="date"
// //           name="startDate"
// //           value={filters.startDate}
// //           onChange={handleFilterChange}
// //           className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
// //         />
// //         {/* End Date */}
// //         <input
// //           value={filters.endDate}
// //           onChange={handleFilterChange}
// //           type="date"
// //           name="endDate"
// //           className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
// //         />
// //         {/* Type */}
// //         <div className="relative">
// //           <select
// //             name="type"
// //             value={filters.type}
// //             onChange={handleFilterChange}
// //             className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
// //           >
// //             <option value="">All Types</option>
// //             <option value="income">Income</option>
// //             <option value="expense">Expense</option>
// //           </select>
// //           <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
// //         </div>
// //         {/* Category */}
// //         <div className="relative">
// //           <select
// //             value={filters.category}
// //             onChange={handleFilterChange}
// //             name="category"
// //             className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
// //           >
// //             <option value="All">All Categories</option>
// //             <option value="Uncategorized">Uncategorized</option>
// //             {categoriesData?.map((category) => {
// //               return (
// //                 <option key={category?._id} value={category?.name}>
// //                   {category?.name}
// //                 </option>
// //               );
// //             })}
// //           </select>
// //           <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
// //         </div>
// //       </div>
// //       <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
// //         {/* Inputs and selects for filtering (unchanged) */}
// //         <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
// //           <h3 className="text-xl font-semibold mb-4 text-gray-800">
// //             Filtered Transactions
// //           </h3>
// //           <ul className="list-disc pl-5 space-y-2">
// //             {transactions?.map((transaction) => (
// //               <li
// //                 key={transaction._id}
// //                 className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
// //               >
// //                 <div>
// //                   <span className="font-medium text-gray-600">
// //                     {new Date(transaction.date).toLocaleDateString()}
// //                   </span>
// //                   <span
// //                     className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                       transaction.type === "income"
// //                         ? "bg-green-100 text-green-800"
// //                         : "bg-red-100 text-red-800"
// //                     }`}
// //                   >
// //                     {transaction.type.charAt(0).toUpperCase() +
// //                       transaction.type.slice(1)}
// //                   </span>
// //                   <span className="ml-2 text-gray-800">
// //                     {transaction.category?.name} - $
// //                     {transaction.amount.toLocaleString()}
// //                   </span>
// //                   <span className="text-sm text-gray-600 italic ml-2">
// //                     {transaction.description}
// //                   </span>
// //                 </div>
// //                 <div className="flex space-x-3">
// //                   <button
// //                     onClick={() => handleUpdateTransaction(transaction._id)}
// //                     className="text-blue-500 hover:text-blue-700"
// //                   >
// //                     <FaEdit />
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(transaction._id)}
// //                     className="text-red-500 hover:text-red-700"
// //                   >
// //                     <FaTrash />
// //                   </button>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TransactionList;




// import React, { useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";
// import { listTransactionsAPI, deleteTransactionAPI } from "../../services/transactions/transactionServices";
// import { listCategoriesAPI } from "../../services/category/categoryServices";

// const TransactionList = () => {
//   //! Filtering state
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     type: "",
//     category: "",
//   });

//   //! Handle Filter Change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   //! Fetch categories
//   const {
//     data: categoriesData,
//     isLoading: categoryLoading,
//     error: categoryErr,
//   } = useQuery({
//     queryFn: listCategoriesAPI,
//     queryKey: ["list-categories"],
//   });

//   //! Fetch transactions
//   const {
//     data: transactions,
//     isError,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryFn: () => listTransactionsAPI(filters),
//     queryKey: ["list-transactions", filters],
//   });

//   //! Handle Delete Transaction
//   const deleteMutation = useMutation({
//     mutationFn: (id) => deleteTransactionAPI(id),
//     onSuccess: () => {
//       refetch(); // Refresh transactions after deletion
//     },
//   });

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this transaction?")) {
//       deleteMutation.mutate(id);
//     }
//   };

//   //! Handle Edit Transaction (Placeholder)
//   const handleUpdateTransaction = (id) => {
//     alert(`Edit transaction with ID: ${id}`);
//     // Navigate to edit page or open modal (implementation needed)
//   };

//   return (
//     <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
//       {/* Filters Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Start Date */}
//         <input
//           type="date"
//           name="startDate"
//           value={filters.startDate}
//           onChange={handleFilterChange}
//           className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//         />
//         {/* End Date */}
//         <input
//           value={filters.endDate}
//           onChange={handleFilterChange}
//           type="date"
//           name="endDate"
//           className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//         />
//         {/* Type */}
//         <div className="relative">
//           <select
//             name="type"
//             value={filters.type}
//             onChange={handleFilterChange}
//             className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
//           >
//             <option value="">All Types</option>
//             <option value="income">Income</option>
//             <option value="expense">Expense</option>
//           </select>
//           <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
//         </div>
//         {/* Category */}
//         <div className="relative">
//           <select
//             value={filters.category}
//             onChange={handleFilterChange}
//             name="category"
//             className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
//           >
//             <option value="">All Categories</option>
//             {categoriesData?.map((category) => (
//               <option key={category._id} value={category.name}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
//         </div>
//       </div>

//       {/* Loading & Error Handling */}
//       {isLoading && <p className="text-blue-500 text-center mt-4">Loading transactions...</p>}
//       {isError && <p className="text-red-500 text-center mt-4">{error.message}</p>}

//       {/* Transactions List */}
//       {transactions?.length > 0 ? (
//         <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtered Transactions</h3>
//           <ul className="list-disc pl-5 space-y-2">
//             {transactions.map((transaction) => (
//               <li
//                 key={transaction._id}
//                 className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
//               >
//                 <div>
//                   <span className="font-medium text-gray-600">
//                     {new Date(transaction.date).toLocaleDateString()}
//                   </span>
//                   <span
//                     className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       transaction.type === "income"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
//                   </span>
//                   <span className="ml-2 text-gray-800">
//                     {transaction.category?.name} - ${transaction.amount.toLocaleString()}
//                   </span>
//                   <span className="text-sm text-gray-600 italic ml-2">
//                     {transaction.description}
//                   </span>
//                 </div>
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => handleUpdateTransaction(transaction._id)}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(transaction._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-4">No transactions found.</p>
//       )}
//     </div>
//   );
// };

// export default TransactionList;


// // import React, { useState } from "react";
// // import { useMutation, useQuery } from "@tanstack/react-query";
// // import { FaTrash, FaEdit } from "react-icons/fa";
// // import { ChevronDownIcon } from "@heroicons/react/24/solid";
// // import { listTransactionsAPI, deleteTransactionAPI } from "../../services/transactions/transactionServices";
// // import { listCategoriesAPI } from "../../services/category/categoryServices";
// // import { useNavigate } from "react-router-dom";

// // const TransactionList = () => {
// //   //! Filtering state
// //   const [filters, setFilters] = useState({
// //     startDate: "",
// //     endDate: "",
// //     type: "",
// //     category: "",
// //   });

// //   const navigate = useNavigate();

// //   //! Handle Filter Change
// //   const handleFilterChange = (e) => {
// //     const { name, value } = e.target;
// //     setFilters((prev) => ({ ...prev, [name]: value }));
// //   };

// //   //! Fetch categories
// //   const {
// //     data: categoriesData,
// //     isLoading: categoryLoading,
// //     error: categoryErr,
// //   } = useQuery({
// //     queryFn: listCategoriesAPI,
// //     queryKey: ["list-categories"],
// //   });

// //   //! Fetch transactions
// //   const {
// //     data: transactions,
// //     isError,
// //     isLoading,
// //     error,
// //     refetch,
// //   } = useQuery({
// //     queryFn: () => listTransactionsAPI(filters),
// //     queryKey: ["list-transactions", filters],
// //   });

// //   //! Handle Delete Transaction
// //   const deleteMutation = useMutation({
// //     mutationFn: (id) => deleteTransactionAPI(id),
// //     onSuccess: () => {
// //       refetch(); // Refresh transactions after deletion
// //     },
// //   });

// //   // const handleDelete = (id) => {
// //   //   if (window.confirm("Are you sure you want to delete this transaction?")) {
// //   //     deleteMutation.mutate(id);
// //   //   }
// //   // };
// //   const handleDelete = (id) => {
// //     deleteMutation.mutate(id);
// //   };
  

// //   //! Handle Edit Transaction - Navigate to Update Page
// //   const handleUpdateTransaction = (id) => {
// //     navigate(`/transactions/update/${id}`);
// //   };

// //   return (
// //     <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
// //       {/* Filters Section */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         {/* Start Date */}
// //         <input
// //           type="date"
// //           name="startDate"
// //           value={filters.startDate}
// //           onChange={handleFilterChange}
// //           className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
// //         />
// //         {/* End Date */}
// //         <input
// //           value={filters.endDate}
// //           onChange={handleFilterChange}
// //           type="date"
// //           name="endDate"
// //           className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
// //         />
// //         {/* Type */}
// //         <div className="relative">
// //           <select
// //             name="type"
// //             value={filters.type}
// //             onChange={handleFilterChange}
// //             className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
// //           >
// //             <option value="">All Types</option>
// //             <option value="income">Income</option>
// //             <option value="expense">Expense</option>
// //           </select>
// //           <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
// //         </div>
// //         {/* Category */}
// //         <div className="relative">
// //           <select
// //             value={filters.category}
// //             onChange={handleFilterChange}
// //             name="category"
// //             className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
// //           >
// //             <option value="">All Categories</option>
// //             {categoriesData?.map((category) => (
// //               <option key={category._id} value={category.name}>
// //                 {category.name}
// //               </option>
// //             ))}
// //           </select>
// //           <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
// //         </div>
// //       </div>

// //       {/* Loading & Error Handling */}
// //       {isLoading && <p className="text-blue-500 text-center mt-4">Loading transactions...</p>}
// //       {isError && <p className="text-red-500 text-center mt-4">{error.message}</p>}

// //       {/* Transactions List */}
// //       {transactions?.length > 0 ? (
// //         <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
// //           <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtered Transactions</h3>
// //           <ul className="list-disc pl-5 space-y-2">
// //             {transactions.map((transaction) => (
// //               <li
// //                 key={transaction._id}
// //                 className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
// //               >
// //                 <div>
// //                   <span className="font-medium text-gray-600">
// //                     {new Date(transaction.date).toLocaleDateString()}
// //                   </span>
// //                   <span
// //                     className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                       transaction.type === "income"
// //                         ? "bg-green-100 text-green-800"
// //                         : "bg-red-100 text-red-800"
// //                     }`}
// //                   >
// //                     {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
// //                   </span>
// //                   <span className="ml-2 text-gray-800">
// //                     {transaction.category?.name} - ${transaction.amount.toLocaleString()}
// //                   </span>
// //                   <span className="text-sm text-gray-600 italic ml-2">
// //                     {transaction.description}
// //                   </span>
// //                 </div>
// //                 <div className="flex space-x-3">
// //                   <button
// //                     onClick={() => handleUpdateTransaction(transaction._id)}
// //                     className="text-blue-500 hover:text-blue-700"
// //                   >
// //                     <FaEdit />
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(transaction._id)}
// //                     className="text-red-500 hover:text-red-700"
// //                   >
// //                     <FaTrash />
// //                   </button>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       ) : (
// //         <p className="text-center text-gray-500 mt-4">No transactions found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default TransactionList;
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listTransactionsAPI, deleteTransactionAPI } from "../../services/transactions/transactionServices";
import { listCategoriesAPI } from "../../services/category/categoryServices";

const TransactionList = () => {
  //! Filtering state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  //! Fetch categories
  const { data: categoriesData } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  //! Fetch all transactions (unfiltered)
  const { data: allTransactions, refetch, isLoading, isError, error } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  //! Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  //! Apply filters on frontend
  const filteredTransactions = allTransactions?.filter((transaction) => {
    const { startDate, endDate, type, category } = filters;
    
    // Convert transaction date to comparable format
    const transactionDate = new Date(transaction.date).toISOString().split("T")[0];

    return (
      (!startDate || transactionDate >= startDate) && // Start date filter
      (!endDate || transactionDate <= endDate) && // End date filter
      (!type || transaction.type === type) && // Type filter
      (!category || transaction.category?.name === category) // Category filter
    );
  });

  //! Handle delete transaction
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTransactionAPI(id),
    onSuccess: () => {
      refetch();
    },
  });

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this transaction?")) {
  //     deleteMutation.mutate(id);
  //   }
  // };
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {/* Type */}
        <div className="relative">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {/* Category */}
        <div className="relative">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">All Categories</option>
            {categoriesData?.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Loading & Error Handling */}
      {isLoading && <p className="text-blue-500 text-center mt-4">Loading transactions...</p>}
      {isError && <p className="text-red-500 text-center mt-4">{error.message}</p>}

      {/* Transactions List */}
      {filteredTransactions?.length > 0 ? (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Filtered Transactions</h3>
          <ul className="list-disc pl-5 space-y-2">
            {filteredTransactions.map((transaction) => (
              <li
                key={transaction._id}
                className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-800">
                    {transaction.category?.name} - ${transaction.amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 italic ml-2">
                    {transaction.description}
                  </span>
                </div>
                <div className="flex space-x-3">
                  {/* <button
                    onClick={() => alert(`Edit transaction with ID: ${transaction._id}`)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button> */}
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
