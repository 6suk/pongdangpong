import { Me_info_response, me_info } from '@apis/meApis';
import { useSwrData } from '@hooks/apis/useSwrData';

export const Me = () => {
  const { url } = me_info;
  const { data, isLoading } = useSwrData(url);
  const {
    name = '',
    type = '',
    phone = '',
    center: { code } = { code: '' },
    loginId = '',
  } = data ?? ({} as Me_info_response);

  return (
    <>
      <h1>내정보</h1>
      {!isLoading && (
        <ul style={{ listStyle: 'none' }}>
          <li>{code}</li>
          <li>{loginId}</li>
          <li>{name}</li>
          <li>{type}</li>
          <li>{phone}</li>
        </ul>
      )}
    </>
  );
};

export default Me;
