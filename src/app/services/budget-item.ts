import { api } from "../lib/api";
import { BudgetRequest } from "../models/budget-request";


// ---------------Get-----------------------
interface FetchBudgetItemsResponse {
  data: BudgetRequest[]; //before
  // data: BudgetRequest; //after
}

export const fetchBudgetItems = async (): Promise<BudgetRequest[]> => {  //before
// export const fetchBudgetItems = async (): Promise<BudgetRequest> => {
// export const fetchBudgetItems = async (): Promise<FetchBudgetItemsResponse> => {  //after1
const response = await api.get<FetchBudgetItemsResponse>("/items"); //before
  // const response = await api.get<BudgetRequest>("/items"); 
  console.log(response)
  console.log("Hi")
  console.log(response.data)
  // const data = response.data
  const { data } = response.data;
  // const { data } = response;
  console.log("Hey")
  console.log(data)
  console.log("Shit")
  // console.log(data.data) //don't work undefined
  // const data = response.data;
  // return data; //original
  // return data
  return data
};

// ---------------Post----------------------

interface CreateBudgetItemRequest {
  title: string;
  quantity: number;
  amount: number;
}

//ส่งผลลัพธ์หลังจาก create ให้แสดงผลทันทีไม่ต้อง refresh หน้า
interface CreateBudgetItemResponse {
  data: BudgetRequest;
}

export const createBudgetItem = async (body: CreateBudgetItemRequest): Promise<BudgetRequest> => {
  const response = await api.post<CreateBudgetItemResponse>("/items", body);
  const { data } = response.data;
  return data;
};
