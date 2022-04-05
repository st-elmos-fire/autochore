type HouseholdRole = 'admin' | 'member';
export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  household: string;
  household_role: HouseholdRole;
}
