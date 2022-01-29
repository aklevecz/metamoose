type Props = {
  src: string;
  height?: string | number;
  width?: string | number;
};

export default function Img({ src, height, width }: Props) {
  if (height && !width) {
    width = "auto";
  }
  if (width && !height) {
    height = "auto";
  }
  return <img style={{ height, width }} src={src} />;
}
