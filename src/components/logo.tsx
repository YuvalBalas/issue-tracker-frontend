import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Logo() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer"
    >
      <Compass />
    </Button>
  );
}
