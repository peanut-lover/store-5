import React from 'react';
import styled from 'styled-components';

// 상호 : (주)우아한형제들 대표 : 김범준 사업자등록번호 : 120-87-65763 통신판매업신고번호 : 2012-서울송파-0515 [사업자정보확인]
// 팩스번호 : 050-605-0041 메일 : baemin_store@woowahan.com 배민문방구 인스타그램 : @baemin_store
// 주소 : 서울특별시 송파구 위례성대로 2 장은빌딩  호스팅제공 : 엔에이치엔고도(주)
// © Woowa Brothers Corp. All right Reserved

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterInfoSection>
        <FooterInfoList>
          <dl>
            <dt>상호 :</dt>
            <dd>(주)건강한형제들 </dd>
          </dl>
          <dl>
            <dt>대표 :</dt>
            <dd>고우혁 권기석 신어진 손지호</dd>
          </dl>
        </FooterInfoList>
        <FooterInfoList>
          <dl>
            <dt>팩스번호 :</dt>
            <dd>000-000-000</dd>
          </dl>
          <dl>
            <dt>메일 :</dt>
            <dd>baemin_store@woowahan.com</dd>
          </dl>
          <dl>
            <dt>주소 :</dt>
            <dd>잠실 어딘가 </dd>
          </dl>
        </FooterInfoList>
        <FooterInfoList>© Woowa Brothers Corp. All right Reserved</FooterInfoList>
      </FooterInfoSection>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const FooterInfoSection = styled.div`
  width: 500px;
`;

const FooterInfoList = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 3px;

  dl {
    display: flex;
    margin-right: 3px;
    ::after {
      content: '|';
      padding: 0 5px;
    }
    dt,
    dd {
      padding: 1px;
      background-color: #c0c0c0;
    }
  }
`;
