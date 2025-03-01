interface ErrorCompProps {
  message: string;
  type?: "normal" | "error";
}

const ErrorComp = ({ message, type = "error" }: ErrorCompProps) => {
  return <div className={`error ${type}`}>{message}</div>;
};

export default ErrorComp;
