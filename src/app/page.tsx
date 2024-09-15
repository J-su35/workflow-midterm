"use client";

import BudgetPanel from "./components/BudgetPanel";
import BudgetRequestDataTable from "./components/BudgetRequestDataTable";
import Header from "./components/Header";
import { ChangeEvent, FormEvent, useState } from "react";
import { BudgetRequest } from "./models/budget-request";

let nextId = 3;
function Home() {
  //   const [budgetRequests, setBudgetRequests] = useState<BudgetRequests[]>([
  //   {
  //     image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  //     title: "Monitor",
  //     amount: "$2500.00",
  //   },
  //   {
  //     image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  //     title: "Hard Disk/SSD",
  //     amount: "$2000.75",
  //   },
  //   {
  //     image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  //     title: "Monitor",
  //     amount: "$2500.00",
  //   },
  //   {
  //     image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  //     title: "Hard Disk/SSD",
  //     amount: "$2000.75",
  //   },
  // ]);

  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([
    {
      id: 1,
      title: "Monitor",
      amount: 100,
      quantity: 1,
      status: "PENDING",
    },
    {
      id: 2,
      title: "Ram",
      amount: 200,
      quantity: 1,
      status: "APPROVED",
    },
    {
      id: 3,
      title: "CPU",
      amount: 300,
      quantity: 1,
      status: "APPROVED",
    },
  ]);
  const [newRequest, setNewRequest] = useState<BudgetRequest>({
    id: 0,
    title: "",
    amount: 0,
    quantity: 1,
    status: "PENDING",
  });

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
    event.target.value === "number"
    ? Number(event.target.value)
    : event.target.value;
    setNewRequest({
        ...newRequest,
        [event.target.name]: value,
      });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBudgetRequests([
      ...budgetRequests, 
      {
      id: nextId++,
      title: "",
      amount: 0,
      quantity: 1,
      status: "PENDING",
    },
  ]);
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests}/>
        </div>
        {/* old code */}
        <form onSubmit={handleSubmit}>
          <div>
            Title:
            <input
            name="title"
            value={newRequest.title}
            onChange={updateField}
            />
          </div>
          <div>
            Amount:
            <input
              name="amount"
              type="number"
              value={newRequest.amount}
              onChange={updateField}
            />
          </div>
          <button>Add</button>
        </form>
        {/* old code */}
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests}/>
        </div>
      </main>
    </div>
  );
}

export default Home;