import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ShimmerCard = styled.div`
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-surface) 0%,
      var(--color-border) 50%,
      var(--color-surface) 100%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite;
  }
`;

const ShimmerImage = styled.div`
  width: 100%;
  padding-top: 75%;
  background: var(--color-border);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-border) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      var(--color-border) 100%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite;
  }
`;

const ShimmerContent = styled.div`
  padding: var(--spacing-md);
  background: var(--color-surface);
  position: relative;
`;

const ShimmerLine = styled.div`
  height: 16px;
  border-radius: var(--radius-sm);
  background: var(--color-border);
  margin-bottom: var(--spacing-sm);
  width: ${props => props.width || '100%'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-border) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      var(--color-border) 100%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite;
  }

  &:last-child {
    margin-bottom: 0;
    width: ${props => props.width || '60%'};
  }
`;

function ShimmerCardComponent() {
  return (
    <ShimmerCard>
      <ShimmerImage />
      <ShimmerContent>
        <ShimmerLine />
        <ShimmerLine width="80%" />
      </ShimmerContent>
    </ShimmerCard>
  );
}

export default ShimmerCardComponent;
