import { api } from "../lib/api";
import { BudgetRequest } from "../models/budget-request";


// ---------------Get-----------------------
interface FetchBudgetItemsResponse {
  data: BudgetRequest[]; 
}

export const fetchBudgetItems = async (): Promise<BudgetRequest[]> => {  

const response = await api.get<FetchBudgetItemsResponse>("/items");
const { data } = response.data;

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
