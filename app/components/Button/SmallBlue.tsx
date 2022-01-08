import Button from ".";
type Props = {
  children: JSX.Element | JSX.Element[] | string;
};
export default function SmallBlue({ children }: Props) {
  return <Button className="sm">{children}</Button>;
}
