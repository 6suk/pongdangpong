export interface staffs_list_type {
  meta: {
    totalCount: number;
    size: number;
    count: number;
    page: number;
    hasMore: boolean;
  };
  datas: Staffs_list_dats_type[];
  message: string;
}

export interface Staffs_list_dats_type {
  id: number;
  name: string;
  phone: string;
  memberCount: number;
  rating: number;
  memo: string;
}

interface Staffs_form_type {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  roles: number[];
}

export const staff_form: Staffs_form_type = {
  loginId: '',
  password: '',
  name: '',
  phone: '',
  roles: [],
};

export interface Roles_response {
  roles: Roles[];
  message: string;
}

export interface Roles {
  id: number;
  name: string;
  description: string;
  permissions: [
    {
      title: string;
      description: string;
    },
  ];
}
