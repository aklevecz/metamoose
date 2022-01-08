type Props = {
  children: JSX.Element | JSX.Element[] | string;
  className: string;
};

export default function Button({ children, className }: Props) {
  return <button className={className}>{children}</button>;
}
