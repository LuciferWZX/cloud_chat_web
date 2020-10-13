import React, { FC } from 'react';
import { ParticleBackground } from '@/components';
import {
  LoginLayoutBox,
  LoginLayoutContainer,
} from '@/layouts/loginLayout/style';
const LoginLayout: FC = ({ children }) => {
  return (
    <LoginLayoutBox>
      <ParticleBackground />
      <LoginLayoutContainer>{children}</LoginLayoutContainer>
    </LoginLayoutBox>
  );
};
export default LoginLayout;
