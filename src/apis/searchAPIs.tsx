export type SearchResponse = {
  searchParam: {
    query: string;
    resources: string[];
  };
  members: {
    id: number;
    name: string;
    phone: string;
    sex: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
    visitedAt: string;
  }[];
  users: {
    id: number;
    type: string;
    loginId: string;
    name: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    lastLoginedAt: string;
  }[];
  message: string;
};

export type SearchMemberType = {
  id: number;
  name: string;
  phone: string;
  sex: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
};

export type SearchUserType = {
  id: number;
  type: string;
  loginId: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginedAt: string;
};
