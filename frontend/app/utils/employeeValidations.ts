export interface EmployeeForm {
    name: string;
    role: string;
    salary: string;
  }
  
  export interface EmployeeErrors {
    name?: string;
    role?: string;
    salary?: string;
  }
  
  export function validateEmployeeForm(
    form: EmployeeForm
  ): EmployeeErrors {
    const errors: EmployeeErrors = {};
  
    if (!form.name.trim()) {
      errors.name = "Name is required";
    }
  
    if (!form.role.trim()) {
      errors.role = "Role is required";
    }
  
    if (!form.salary || Number(form.salary) <= 0) {
      errors.salary = "Salary must be greater than 0";
    }
  
    return errors;
  }
  