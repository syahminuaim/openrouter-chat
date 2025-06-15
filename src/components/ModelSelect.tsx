import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ModelOption {
  label: string;
  value: string;
  category: string;
}

const MODEL_OPTIONS: ModelOption[] = [
  // OpenAI Models
  { label: "GPT-4o", value: "openai/gpt-4o", category: "OpenAI" },
  { label: "GPT-4o Mini", value: "openai/gpt-4o-mini", category: "OpenAI" },
  { label: "GPT-4 Turbo", value: "openai/gpt-4-turbo", category: "OpenAI" },
  { label: "GPT-3.5 Turbo", value: "openai/gpt-3.5-turbo", category: "OpenAI" },
  
  { label: "Claude 3.5 Sonnet", value: "anthropic/claude-3.5-sonnet", category: "Anthropic" },
  { label: "Claude 3.5 Haiku", value: "anthropic/claude-3-5-haiku-20241022", category: "Anthropic" },
  { label: "Claude 3 Opus", value: "anthropic/claude-3-opus", category: "Anthropic" },
  { label: "Claude 3 Sonnet", value: "anthropic/claude-3-sonnet", category: "Anthropic" },
  { label: "Claude 3 Haiku", value: "anthropic/claude-3-haiku", category: "Anthropic" },
  
  { label: "Gemini Pro 1.5", value: "google/gemini-pro-1.5", category: "Google" },
  { label: "Gemini Pro", value: "google/gemini-pro", category: "Google" },
  { label: "Gemini Flash 1.5", value: "google/gemini-flash-1.5", category: "Google" },
  
  { label: "Llama 3.1 405B", value: "meta-llama/llama-3.1-405b-instruct", category: "Meta" },
  { label: "Llama 3.1 70B", value: "meta-llama/llama-3.1-70b-instruct", category: "Meta" },
  { label: "Llama 3.1 8B", value: "meta-llama/llama-3.1-8b-instruct", category: "Meta" },
  { label: "Llama 3 70B", value: "meta-llama/llama-3-70b-instruct", category: "Meta" },
  { label: "Llama 3 8B", value: "meta-llama/llama-3-8b-instruct", category: "Meta" },
  
  { label: "Mistral Large", value: "mistralai/mistral-large", category: "Mistral" },
  { label: "Mistral Medium", value: "mistralai/mistral-medium", category: "Mistral" },
  { label: "Mistral Small", value: "mistralai/mistral-small", category: "Mistral" },
  { label: "Mixtral 8x7B", value: "mistralai/mixtral-8x7b-instruct", category: "Mistral" },
  { label: "Mixtral 8x22B", value: "mistralai/mixtral-8x22b-instruct", category: "Mistral" },
  
  { label: "Command R+", value: "cohere/command-r-plus", category: "Cohere" },
  { label: "Command R", value: "cohere/command-r", category: "Cohere" },
  
  { label: "OpenChat 3.5", value: "openchat/openchat-3.5-1210", category: "OpenChat" },
  { label: "Zephyr 7B Beta", value: "huggingface/zephyr-7b-beta", category: "Hugging Face" },
  { label: "CodeLlama 34B", value: "codellama/codellama-34b-instruct", category: "CodeLlama" },
  { label: "CodeLlama 13B", value: "codellama/codellama-13b-instruct", category: "CodeLlama" },
  { label: "CodeLlama 7B", value: "codellama/codellama-7b-instruct", category: "CodeLlama" },

  { label: "Nous Hermes 2 Yi 34B", value: "nousresearch/nous-hermes-2-yi-34b", category: "Nous Research" },
  { label: "Nous Hermes 2 Mixtral 8x7B", value: "nousresearch/nous-hermes-2-mixtral-8x7b-dpo", category: "Nous Research" },
  { label: "WizardLM 2 8x22B", value: "microsoft/wizardlm-2-8x22b", category: "Microsoft" },
  { label: "Qwen 2 72B", value: "qwen/qwen-2-72b-instruct", category: "Qwen" },
  { label: "Deepseek Coder 33B", value: "deepseek/deepseek-coder-33b-instruct", category: "DeepSeek" },
];

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
            border border-zinc-300 bg-background
            focus:outline-none focus:ring-0 focus:border-zinc-400
            ring-0 shadow-none
            transition
          `}
        >
          <SelectValue placeholder="Select a model">
            {compact && selectedModel ? selectedModel.label : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {/* --- Model search input --- */}
          <div className="sticky top-0 z-10 bg-popover px-2 pb-2 pt-2">
            <div className="relative">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className={`
                  bg-background text-sm pl-8
                  border border-zinc-300
                  focus:outline-none focus:ring-0 focus:border-zinc-300 !important
                  focus:shadow-none !important
                  shadow-none ring-0 transition
                `}
                style={{
                  boxShadow: "none",
                  borderColor: "#d4d4d8", // zinc-300
                }}
                autoFocus
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            </div>
          </div>
          {/* --- Grouped models --- */}
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
          {/* If no results */}
          {filteredModels.length === 0 && (
            <div className="p-3 text-muted-foreground text-sm text-center">
              No models found.
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
