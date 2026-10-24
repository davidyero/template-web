import styled from '@emotion/styled';
import { space, width } from '@shared/styles/layout';

export const Screen = styled.div`
  min-height: 100vh;
  padding: ${space.lg};
  display: flex;
  flex-direction: column;
  gap: ${space.xl};
`;

export const Body = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${width.narrow};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${space.lg};
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.xs};
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space.xs};
  margin-top: ${space.md};
`;
