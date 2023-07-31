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
