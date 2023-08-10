import { UsersSearchType } from '@apis/types/searchTypes';

/** 직원 리스트 필터
 * isActive = true
 * [
    { label: '강사이름1', value: 0 },
    { label: '강사이름2', value: 1 },
    { label: '강사이름3', value: 2 },
  ]
 */
export const mapActiveStaffToLabelValue = (staffList: UsersSearchType[] = []) => {
  return staffList
    .filter(staff => staff.isActive)
    .map(staff => ({
      label: staff.name,
      value: staff.id,
    }));
};
