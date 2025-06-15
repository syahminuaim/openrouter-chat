
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ModelSearch from "./ModelSearch";
import ModelList from "./ModelList";
import { MODEL_OPTIONS, ModelOption } from "@/data/modelOptions";

interface ModelSelectProps {
  value: string;
  onChange: (model: string) => void;
  compact?: boolean;
}

export default function ModelSelect({ value, onChange, compact = false }: ModelSelectProps) {
  const [search, setSearch] = useState("");

  const filteredModels = useMemo(() => {
    const s = search.toLowerCase();
    return s
      ? MODEL_OPTIONS.filter(
          (m) =>
            m.label.toLowerCase().includes(s) ||
            m.category.toLowerCase().includes(s) ||
            m.value.toLowerCase().includes(s)
        )
      : MODEL_OPTIONS;
  }, [search]);

  const groupedModels = useMemo(() => {
    return filteredModels.reduce((acc, model) => {
      if (!acc[model.category]) acc[model.category] = [];
      acc[model.category].push(model);
      return acc;
    }, {} as Record<string, ModelOption[]>);
  }, [filteredModels]);

  const selectedModel = MODEL_OPTIONS.find((m) => m.value === value);

  return (
    <div className={compact ? "min-w-[200px]" : "w-full max-w-xs"}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`
            ${compact ? "h-8 text-xs" : ""}
            bg-background text-sm
            focus:outline-none focus:ring-0 focus:border-input
            ring-0 shadow-none
            transition
          `}
        >
          <SelectValue placeholder="Select a model">
            {compact && selectedModel ? (
              <span className="text-sm text-muted-foreground">
                {selectedModel.value.split("/").pop()?.split("-")[0]?.toUpperCase() || "MODEL"}
              </span>
            ) : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px] w-[400px] p-0">
          <div className="sticky top-0 z-10">
            <ModelSearch value={search} onChange={setSearch} />
          </div>
          <div className="max-h-[250px] overflow-y-auto">
            <ModelList 
              groupedModels={groupedModels} 
              filteredModelsLength={filteredModels.length}
            />
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
