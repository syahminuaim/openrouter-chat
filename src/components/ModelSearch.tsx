
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ModelSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ModelSearch({ value, onChange }: ModelSearchProps) {
  return (
    <div className="bg-popover pt-4 px-3 pb-3 border-b border-border">
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search models..."
          className="bg-background text-sm pl-8 focus:outline-none focus:ring-0 focus:border-input focus:shadow-none shadow-none ring-0 transition"
          autoFocus
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
      </div>
    </div>
  );
}
