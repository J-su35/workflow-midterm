"use client";

import BudgetPanel from "./components/BudgetPanel";
import BudgetRequestDataTable from "./components/BudgetRequestDataTable";
import Header from "./components/Header";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BudgetRequest } from "./models/budget-request";
import { createBudgetItem, fetchBudgetItems } from "./services/budget-item";

let nextId = 3;
function Home() {
  // const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([
  //   {
  //     id: 1,
  //     title: "Monitor",
  //     amount: 100,
  //     quantity: 1,
  //     status: "PENDING",
  //   },
  //   {
  //     id: 2,
  //     title: "Ram",
  //     amount: 200,
  //     quantity: 1,
  //     status: "APPROVED",
  //   },
  //   // {
  //   //   id: 3,
  //   //   title: "CPU",
  //   //   amount: 300,
  //   //   quantity: 1,
  //   //   status: "APPROVED",
  //   // },
  // ]);
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   setBudgetRequests([
  //     ...budgetRequests, 
  //     {
  //     id: nextId++,
  //     title: "",
  //     amount: 0,
  //     quantity: 1,
  //     status: "PENDING",
  //   },
  // ]);
  // };
  useEffect(() => {
    fetchBudgetItems().then((items) => setBudgetRequests(items));
  }, []);

  // const addRequest = (newRequest: BudgetRequest) => {
  //   setBudgetRequests([...budgetRequests, newRequest]);
  // };
  //new addRequest
  const addRequest = async (newRequest: BudgetRequest) => {
    const insertedRequest = await createBudgetItem({
      title: newRequest.title,
      quantity: newRequest.quantity,
      amount: newRequest.amount,
    });
    setBudgetRequests([...budgetRequests, insertedRequest]);
  };

  const [newRequest, setNewRequest] = useState<BudgetRequest>({
    id: 0,
    title: "",
    amount: 0,
    quantity: 1,
    status: "APPROVED",
  });

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const value = 
    event.target.type === "number"
    ? Number(event.target.value)
    : event.target.value;
    setNewRequest({
        ...newRequest,
        [event.target.name]: value,
      });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addRequest({
      id: nextId++,
      title: newRequest.title,
      amount: newRequest.amount,
      quantity: 1,
      status: "APPROVED",
    });
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests}/>
        </div>
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
        {/* <FormAddRequest addRequest={addRequest} /> */}
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

// interface FormAddRequestProps {
//   addRequest(request: BudgetRequest): void;
// }

// function FormAddRequest(props: FormAddRequestProps) {
//   const [newRequest, setNewRequest] = useState<BudgetRequest>({
//     id: 0,
//     title: "",
//     amount: 0,
//     quantity: 1,
//     status: "APPROVED",
//   });

//   const updateField = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = 
//     event.target.type === "number"
//     ? Number(event.target.value)
//     : event.target.value;
//     setNewRequest({
//         ...newRequest,
//         [event.target.name]: value,
//       });
//   };

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   props.addRequest({
  //     id: nextId++,
  //     title: newRequest.title,
  //     amount: newRequest.amount,
  //     quantity: 1,
  //     status: "APPROVED",
  //   });
  // };

export default Home;