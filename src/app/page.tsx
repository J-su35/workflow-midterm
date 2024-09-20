"use client";

import BudgetPanel from "./components/BudgetPanel";
import BudgetRequestDataTable from "./components/BudgetRequestDataTable";
import Header from "./components/Header";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BudgetRequest } from "./models/budget-request";
import { createBudgetItem, fetchBudgetItems } from "./services/budget-item";

let nextId = 3;
function Home() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);   //before

  //------------------------Get data---------------------------------
  useEffect(() => {
    fetchBudgetItems().then((items) => setBudgetRequests(items)); //(a) ดึงข้อมูลมาแสดงผล เหมือน (b) recommend
  }, []);

   //------------------------Post data---------------------------------
  //new addRequest
  const addRequest = async (newRequest: BudgetRequest) => {
    try {
      //ให้ส่งไป function createBudgetItem ก่อนส่งไป submit ที่ setBudgetRequests
      //ของที่จะส่งไป strict ตาม interface ใน createBudgetItem
      const insertedRequest = await createBudgetItem({
        title: newRequest.title,
        quantity: newRequest.quantity,
        amount: newRequest.amount,
    });
    setBudgetRequests([...budgetRequests, insertedRequest]); //(b) แสดงผลหลัง add
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response.data.message
      console.log(errorMessage);
      alert("There was a problem with your submission");
    }
  };

  const [newRequest, setNewRequest] = useState<BudgetRequest>({
    //default values
    id: 0,
    title: "",
    amount: 0,
    quantity: 1,
    status: "PENDING",
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

    setNewRequest({
      id: 0,
      title: "",
      amount: 0,
      quantity: 1,
      status: "PENDING",
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
    
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>

      </main>
    </div>
  );
}

export default Home;
