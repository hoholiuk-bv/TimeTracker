export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  employmentDate: string;
  employmentType: string;
}

export type SearchType = {
  searchText: string;
  startEmploymentDate: string;
  endEmploymentDate: string;
  employmentType: string[];
}
