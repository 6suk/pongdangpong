/**
 * 마지막 path를 제거하는 함수
 * @param path
 * @returns
 */
export const extractBasePath = (path: string) => {
  const segments = path.split('/');
  segments.pop();
  return segments.join('/');
};
