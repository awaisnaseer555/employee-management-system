"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import {
  validateEmployeeForm,
  EmployeeErrors,
} from "../utils/employeeValidations";
import api from '../utils/api';

interface Employee {
  id: number;
  name: string;
  role: string;
  salary: number;
}

export default function EmployeesPage() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [errors, setErrors] = useState<EmployeeErrors>({});

  const [search, setSearch] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ name: "", role: "", salary: "" });
  const limit = 5;

  const loadEmployees = useCallback(async () => {
    const res = await api.get("/employees", {
      params: { search, minSalary, maxSalary, page, limit },
    });
    setEmployees(res.data.data);
    setTotal(res.data.total);
  }, [search, minSalary, maxSalary, page, limit]);

  // auth check before navigate
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) router.replace("/");
    else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthorized(true);
    }
  }, [router]);
  
  useEffect(() => {
    if (!authorized) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEmployees();
  }, [search, minSalary, maxSalary, page, loadEmployees, authorized]);

  async function addEmployee() {
    const validationErrors = validateEmployeeForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const res = await api.post("/employees", {
        name: form.name,
        role: form.role,
        salary: Number(form.salary),
      });

      // If current page is last page, append the new employee
      const totalPages = Math.ceil((total + 1) / limit);
      if (page === totalPages) {
        setEmployees((prev) => [...prev, res.data]);
      }

      // Update total
      setTotal((prev) => prev + 1);

      // Optionally, clear the form
      setForm({ name: "", role: "", salary: "" });
      setErrors({});
      setPage(1);
  
    } catch {
      alert("Failed to add employee");
    }
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-600">Employee Dashboard</h1>
            <ThemeToggle />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <input
          className="p-3 rounded border dark:bg-gray-700"
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="p-3 rounded border dark:bg-gray-700"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
        />
        <input
          className="p-3 rounded border dark:bg-gray-700"
          placeholder="Max Salary"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl shadow-lg border dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-yellow-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee) => (
              <tr
                key={employee.id}
                className="border-t dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="p-3">{employee.name}</td>
                <td className="p-3">{employee.role}</td>
                <td className="p-3">{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
          className={`px-4 py-2 rounded ${
            page <= 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded ${
            page >= totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      <h2 className="text-xl font-bold mt-10 mb-3 text-yellow-600">Add New Employee</h2>

      <div className="grid grid-cols-4 gap-3">
          <input
            className={`p-3 border rounded dark:bg-gray-700 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className={`p-3 border rounded dark:bg-gray-700 ${errors.role ? 'border-red-500' : ''}`}
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            className={`p-3 border rounded dark:bg-gray-700 ${errors.salary ? 'border-red-500' : ''}`}
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
          <button
          onClick={addEmployee}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-green-700"
        >
          Add
        </button>
        <div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role}</p>
          )}
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary}</p>
          )}
        </div>
      </div>
    </div>
  );
}
