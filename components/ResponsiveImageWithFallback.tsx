import { Image } from "react-datocms";
import styled from "styled-components";
import { normalizeResponsiveImage } from "../utils/datocms";
import { ResponsiveImageFragment } from "../__generated__/ResponsiveImageFragment";
import Logo from "./Logo";

const LogoContainer = styled.div<{ ratio: number }>`
  position: relative;
  background-color: #eee;
  &::before {
    display: block;
    content: "";
    padding-bottom: ${(props) => (1 / props.ratio) * 100}%;
  }
`;

const ScaledLogo = styled(Logo)`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
`;

export default function ResponsiveImageWithFallback(props: {
  aspectRatio: number;
  data?: ResponsiveImageFragment | null;
}) {
  if (!props.data)
    return (
      <LogoContainer ratio={props.aspectRatio}>
        <ScaledLogo />
      </LogoContainer>
    );
  return <Image data={normalizeResponsiveImage(props.data)} />;
}
