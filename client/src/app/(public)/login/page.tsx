'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/app/components/Button/Button';
import { InputField } from '@/app/components/TextField/InputField';
import { AuthHeader } from '@/app/components/AuthHeader/AuthHeader';
import { useLogin } from '@/app/hooks/useLogin';
import { useRouter } from 'next/navigation';
import {
  Container,
  InputContainer,
  FixedButtonContainer,
  ErrorMessage,
} from './page.style';

export default function AuthPage() {
  const [resizeHeight, setResizeHeight] = useState<number>(0);

  const router = useRouter();
  const { email, setEmail, password, setPassword, error, login } = useLogin({
    onSuccess: () => router.push('/home'),
  });

  useEffect(() => {
    const resizeHandler = () => {
      if (window.visualViewport) {
        setResizeHeight(window.innerHeight - window.visualViewport.height);
      }
    };

    window.visualViewport?.addEventListener('resize', resizeHandler);
    return () => {
      window.visualViewport?.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const handleRouteBack = () => {
    router.push('/loginbegin');
  };

  const handleRouteSignUp = () => {
    router.push('/register');
  };

  return (
    <Container>
      <AuthHeader title="로그인" onActionClick={handleRouteBack} />

      <InputContainer>
        <InputField
          type="email"
          label="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          label="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>

      <FixedButtonContainer bottomOffset={resizeHeight}>
        <Button
          text="로그인"
          onClick={login}
          backgroundColor="red"
          textColor="white"
        />
        <Button
          text="회원가입"
          onClick={handleRouteSignUp}
          backgroundColor="red"
          textColor="white"
        />
      </FixedButtonContainer>
    </Container>
  );
}
