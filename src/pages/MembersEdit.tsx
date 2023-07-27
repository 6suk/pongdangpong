import React from 'react';

import styled from 'styled-components';

import theme from '@styles/theme';

// import Input from '@components/common/Input';

export const MembersEdit = () => {
  return (
    <S.MembersEditContainer theme={theme}>
      <h2>회원정보</h2>
      <p>등록된 회원 정보입니다.</p>
    </S.MembersEditContainer>
  );
};

const S = {
  MembersEditContainer: styled.div`
    h2 {
      text-align: center;
      font-size: ${({ theme: { font } }) => font['main']};
    }
  `,
};
