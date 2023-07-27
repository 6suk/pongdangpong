import { useSwrData } from '@hooks/apis/useSwrData';

export const STicketQuery = () => {
  const { data } = useSwrData(`${location.pathname}${location.search}`);
  console.log(data);

  return (
    <>
      <form method="get">
        <select name="page">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select name="size">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <select name="sort">
          <option value="createdAt,Desc">등록 오름차순</option>
          <option value="createdAt">등록 내림차순</option>
        </select>
        <input type="submit" value={'검색'} />
      </form>
    </>
  );
};
