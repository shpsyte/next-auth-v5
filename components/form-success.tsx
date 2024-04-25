import { FiAlertTriangle } from "react-icons/fi";

type FormSucessProps = {
  message?: string;
};

export default function FormSuccess({ message }: FormSucessProps) {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <FiAlertTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
