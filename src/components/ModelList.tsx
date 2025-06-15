
import { SelectGroup, SelectItem } from "@/components/ui/select";

interface ModelOption {
  label: string;
  value: string;
  category: string;
}

interface ModelListProps {
  groupedModels: Record<string, ModelOption[]>;
  filteredModelsLength: number;
}

export default function ModelList({ groupedModels, filteredModelsLength }: ModelListProps) {
  return (
    <div className="p-1">
      {Object.entries(groupedModels).map(([category, models]) => (
        <SelectGroup key={category}>
          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
            {category}
          </div>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              {model.label}
            </SelectItem>
          ))}
        </SelectGroup>
      ))}
      {filteredModelsLength === 0 && (
        <div className="p-3 text-muted-foreground text-sm text-center">
          No models found.
        </div>
      )}
    </div>
  );
}
