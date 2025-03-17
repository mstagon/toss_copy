'use client';

import { FiSearch, FiMenu } from 'react-icons/fi';
import {
  HeaderContainer,
  MarketInfo,
  MarketValue,
  MarketChange,
  MarketName,
  IconContainer,
  IconButton,
} from './MarketHeader.style';
import { useRouter } from 'next/navigation';

export function MarketHeader() {
  const router = useRouter();
  const handleRouteSearch = () => {
    router.push('/search');
  };
  return (
    <HeaderContainer>
      <MarketInfo>
        <MarketName>나스닥</MarketName>
        <MarketValue negative>17,251.32</MarketValue>
        <MarketChange negative>-4.0%</MarketChange>
      </MarketInfo>
      <IconContainer>
        <IconButton onClick={handleRouteSearch}>
          <FiSearch size={24} />
        </IconButton>
        <IconButton>
          <FiMenu size={24} />
        </IconButton>
      </IconContainer>
    </HeaderContainer>
  );
}
