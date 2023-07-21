export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  employmentDate: string;
  employmentType: string;
}

export type FilterType = {
  searchText: string;
  startEmploymentDate: string | null;
  endEmploymentDate: string | null;
  employmentTypes: string[];
}

export enum employmentType {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME',
}

export enum employmentTypeForDisplay {
  FullTime = 'full-time',
  PartTime = 'part-time',
}
