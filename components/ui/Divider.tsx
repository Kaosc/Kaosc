export default function Divider({
  className,
}: {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
}) {
  return <div className={`${className}`}></div>;
}
