import { HandIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

interface AlertProps {
  message: string;
}

export function AlertComponent({ message }: AlertProps) {
  return (
    <Alert>
      <HandIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
