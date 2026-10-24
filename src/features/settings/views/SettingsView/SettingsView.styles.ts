import styled from '@emotion/styled';
import { space } from '@shared/styles/layout';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${space.md};
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space.xs};
  padding-top: ${space.xl};
`;
