import { styled } from 'styled-components';

export const Loading = () => {
  return (
    <LoadingWrap>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="w-10 h-10 border-4 border-blue-200 rounded-full animate-spin"
          style={{ borderTopColor: 'transparent' }}
        />
      </div>
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
