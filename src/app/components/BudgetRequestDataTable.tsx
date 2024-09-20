import { formatDecimal } from "../lib/format-decimal";
import { BudgetRequest } from "../models/budget-request";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Stamp } from "lucide-react";
import Link from "next/link";

interface BudgetRequestDataTableProps {
  items: BudgetRequest[];
}

function BudgetRequestDataTable({ items }: BudgetRequestDataTableProps) {

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Id
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Budget
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {items.map((request) => (
          <tr key={request.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              {/* <button className="text-gray-600 hover:text-blue-600"> */}
              <Link href={`/edit/${request.id}`} passHref>
                <Pencil className="h-4 w-4" />
              </Link>
              {/* </button> */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="text-gray-600 hover:text-blue-600">
                <Stamp className="h-4 w-4" />
              </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="text-gray-600 hover:text-blue-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {request.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="font-bold">{request.title}</span> x{" "}
              {request.quantity} Units
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {formatDecimal(request.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BudgetRequestDataTable;
