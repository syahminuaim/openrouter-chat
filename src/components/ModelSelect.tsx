
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelOption {
  label: string;
  value: string;
}

const MODEL_OPTIONS: ModelOption[] = [
  { label: "OpenChat 3.5", value: "openchat/openchat-3.5-1210" },
  { label: "GPT-4.1 (recommended)", value: "gpt-4.1-2025-04-14" },
  { label: "O3 Reasoner", value: "o3-2025-04-16" },
  { label: "O4 Mini", value: "o4-mini-2025-04-16" },
  { label: "Claude Opus 4", value: "claude-opus-4-20250514" },
  { label: "Claude Sonnet 4", value: "claude-sonnet-4-20250514" },
  { label: "Claude 3.5 Haiku", value: "claude-3-5-haiku-20241022" }
];

interface ModelSelectProps {
  value: string;
  onChange: (model: string) => void;
}

export default function ModelSelect({ value, onChange }: ModelSelectProps) {
  return (
    <div className="w-full max-w-xs">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {MODEL_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
