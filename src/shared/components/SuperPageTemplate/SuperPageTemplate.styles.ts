import styled from '@emotion/styled';
import { breakpoint, space, width } from '@shared/styles/layout';

export const Page = styled.main<{ $width: 'narrow' | 'default' }>`
  width: 100%;
  max-width: ${({ $width }) => width[$width]};
  margin: 0 auto;
  padding: ${space.xl} ${space.lg} ${space.xxxl};
  display: flex;
  flex-direction: column;
  gap: ${space.xl};
  ${breakpoint.md} {
    padding: ${space.xxl} ${space.xl} ${space.xxxl};
  }
`;

export const Head = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${space.md};
`;

export const HeadText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.xs};
  min-width: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${space.sm};
`;
