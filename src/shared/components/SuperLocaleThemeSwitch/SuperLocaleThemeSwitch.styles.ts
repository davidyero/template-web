import styled from '@emotion/styled';
import { space } from '@shared/styles/layout';

export const Row = styled.div<{ $align: 'start' | 'end' }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ $align }) => ($align === 'end' ? 'flex-end' : 'flex-start')};
  gap: ${space.lg};
`;
