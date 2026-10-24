import styled from '@emotion/styled';
import { breakpoint, space, token, width } from '@shared/styles/layout';

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${token('surface')};
  border-bottom: 1px solid ${token('border')};
`;

export const BarInner = styled.div`
  max-width: ${width.default};
  margin: 0 auto;
  padding: ${space.sm} ${space.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space.md};
  ${breakpoint.md} {
    padding: ${space.sm} ${space.xl};
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${space.xs};
`;
