"use client";

import BudgetPanel from "./components/BudgetPanel";
import BudgetRequestDataTable from "./components/BudgetRequestDataTable";
import Header from "./components/Header";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BudgetRequest } from "./models/budget-request";
import { createBudgetItem, fetchBudgetItems } from "./services/budget-item";
// import { ItemInfoContext } from "./layout";

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
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);   //before
  // const [budgetRequests, setBudgetRequests] = useState<BudgetRequest>();  
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

  //------------------------Get data---------------------------------
  useEffect(() => {
    fetchBudgetItems().then((items) => setBudgetRequests(items)); //(a) ดึงข้อมูลมาแสดงผล เหมือน (b) recommend
    // fetchBudgetItems().then((items) => console.log(items)); //log
  }, []);
  // const addRequest = (newRequest: BudgetRequest) => {
  //   setBudgetRequests([...budgetRequests, newRequest]);
  // };

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
      quantity: newRequest.quantity,
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

  // const { title, quantity, amount } = useContext(ItemInfoContext);
  // console.log(title, quantity, amount)

  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests}/>
        </div>
        {/* <form onSubmit={handleSubmit}>
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
        </form> */}
        <div className="py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="title" className="w-1/6 text-left font-medium">
                Title:
              </label>
              <input
                id="title"
                name="title"
                value={newRequest.title}
                onChange={updateField}
                className="w-5/6 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <label htmlFor="amount" className="w-1/6 text-left font-medium">
                Amount:
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                value={newRequest.amount}
                onChange={updateField}
                className="w-5/6 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <label htmlFor="quantity" className="w-1/6 text-left font-medium">
                Quantity:
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={newRequest.quantity}
                onChange={updateField}
                className="w-5/6 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
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

//---------------------------------------------------------------------------------
// "use client";

// import DemoUseEffect from "./components/DemoUseEffect";

// function Home() {

//   return (
//     <div>
//       <DemoUseEffect />
//     </div>
//   );
// }

// export default Home;