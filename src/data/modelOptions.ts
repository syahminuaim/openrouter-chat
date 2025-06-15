export interface ModelOption {
  label: string;
  value: string;
  category: string;
}

export const MODEL_OPTIONS: ModelOption[] = [
  // OpenAI Models
  { label: "GPT-4o", value: "openai/gpt-4o", category: "OpenAI" },
  { label: "GPT-4o Mini", value: "openai/gpt-4o-mini", category: "OpenAI" },
  { label: "GPT-4 Turbo", value: "openai/gpt-4-turbo", category: "OpenAI" },
  { label: "GPT-4 Turbo Preview", value: "openai/gpt-4-turbo-preview", category: "OpenAI" },
  { label: "GPT-4", value: "openai/gpt-4", category: "OpenAI" },
  { label: "GPT-4 32K", value: "openai/gpt-4-32k", category: "OpenAI" },
  { label: "GPT-3.5 Turbo", value: "openai/gpt-3.5-turbo", category: "OpenAI" },
  { label: "GPT-3.5 Turbo 16K", value: "openai/gpt-3.5-turbo-16k", category: "OpenAI" },
  { label: "GPT-3.5 Turbo Instruct", value: "openai/gpt-3.5-turbo-instruct", category: "OpenAI" },
  
  // Anthropic Models
  { label: "Claude 3.5 Sonnet", value: "anthropic/claude-3.5-sonnet", category: "Anthropic" },
  { label: "Claude 3.5 Haiku", value: "anthropic/claude-3-5-haiku-20241022", category: "Anthropic" },
  { label: "Claude 3 Opus", value: "anthropic/claude-3-opus", category: "Anthropic" },
  { label: "Claude 3 Sonnet", value: "anthropic/claude-3-sonnet", category: "Anthropic" },
  { label: "Claude 3 Haiku", value: "anthropic/claude-3-haiku", category: "Anthropic" },
  { label: "Claude 2.1", value: "anthropic/claude-2.1", category: "Anthropic" },
  { label: "Claude 2", value: "anthropic/claude-2", category: "Anthropic" },
  { label: "Claude Instant 1.2", value: "anthropic/claude-instant-1.2", category: "Anthropic" },
  
  // Google Models
  { label: "Gemini Pro 1.5", value: "google/gemini-pro-1.5", category: "Google" },
  { label: "Gemini Pro", value: "google/gemini-pro", category: "Google" },
  { label: "Gemini Flash 1.5", value: "google/gemini-flash-1.5", category: "Google" },
  { label: "Gemini Flash 1.5 8B", value: "google/gemini-flash-1.5-8b", category: "Google" },
  { label: "PaLM 2 Chat", value: "google/palm-2-chat-bison", category: "Google" },
  { label: "PaLM 2 Code Chat", value: "google/palm-2-codechat-bison", category: "Google" },
  
  // Meta Llama Models
  { label: "Llama 3.1 405B", value: "meta-llama/llama-3.1-405b-instruct", category: "Meta" },
  { label: "Llama 3.1 70B", value: "meta-llama/llama-3.1-70b-instruct", category: "Meta" },
  { label: "Llama 3.1 8B", value: "meta-llama/llama-3.1-8b-instruct", category: "Meta" },
  { label: "Llama 3 70B", value: "meta-llama/llama-3-70b-instruct", category: "Meta" },
  { label: "Llama 3 8B", value: "meta-llama/llama-3-8b-instruct", category: "Meta" },
  { label: "Llama 2 70B Chat", value: "meta-llama/llama-2-70b-chat", category: "Meta" },
  { label: "Llama 2 13B Chat", value: "meta-llama/llama-2-13b-chat", category: "Meta" },
  { label: "Llama 2 7B Chat", value: "meta-llama/llama-2-7b-chat", category: "Meta" },
  { label: "Code Llama 34B Instruct", value: "meta-llama/codellama-34b-instruct", category: "Meta" },
  { label: "Code Llama 13B Instruct", value: "meta-llama/codellama-13b-instruct", category: "Meta" },
  { label: "Code Llama 7B Instruct", value: "meta-llama/codellama-7b-instruct", category: "Meta" },
  
  // Mistral Models
  { label: "Mistral Large", value: "mistralai/mistral-large", category: "Mistral" },
  { label: "Mistral Medium", value: "mistralai/mistral-medium", category: "Mistral" },
  { label: "Mistral Small", value: "mistralai/mistral-small", category: "Mistral" },
  { label: "Mistral 7B Instruct", value: "mistralai/mistral-7b-instruct", category: "Mistral" },
  { label: "Mixtral 8x7B", value: "mistralai/mixtral-8x7b-instruct", category: "Mistral" },
  { label: "Mixtral 8x22B", value: "mistralai/mixtral-8x22b-instruct", category: "Mistral" },
  { label: "Codestral", value: "mistralai/codestral", category: "Mistral" },
  { label: "Codestral Mamba", value: "mistralai/codestral-mamba", category: "Mistral" },
  
  // Cohere Models
  { label: "Command R+", value: "cohere/command-r-plus", category: "Cohere" },
  { label: "Command R", value: "cohere/command-r", category: "Cohere" },
  { label: "Command", value: "cohere/command", category: "Cohere" },
  { label: "Command Nightly", value: "cohere/command-nightly", category: "Cohere" },
  { label: "Command Light", value: "cohere/command-light", category: "Cohere" },
  { label: "Command Light Nightly", value: "cohere/command-light-nightly", category: "Cohere" },
  
  // Perplexity Models
  { label: "Llama 3.1 Sonar 70B", value: "perplexity/llama-3.1-sonar-large-128k-online", category: "Perplexity" },
  { label: "Llama 3.1 Sonar 8B", value: "perplexity/llama-3.1-sonar-small-128k-online", category: "Perplexity" },
  { label: "Llama 3.1 Sonar 70B Chat", value: "perplexity/llama-3.1-sonar-large-128k-chat", category: "Perplexity" },
  { label: "Llama 3.1 Sonar 8B Chat", value: "perplexity/llama-3.1-sonar-small-128k-chat", category: "Perplexity" },
  
  // xAI Models
  { label: "Grok Beta", value: "x-ai/grok-beta", category: "xAI" },
  { label: "Grok Vision Beta", value: "x-ai/grok-vision-beta", category: "xAI" },
  
  // Microsoft Models
  { label: "WizardLM 2 8x22B", value: "microsoft/wizardlm-2-8x22b", category: "Microsoft" },
  { label: "WizardLM 2 7B", value: "microsoft/wizardlm-2-7b", category: "Microsoft" },
  { label: "Phi 3 Medium 128K", value: "microsoft/phi-3-medium-128k-instruct", category: "Microsoft" },
  { label: "Phi 3 Mini 128K", value: "microsoft/phi-3-mini-128k-instruct", category: "Microsoft" },
  
  // Qwen Models
  { label: "Qwen 2.5 72B", value: "qwen/qwen-2.5-72b-instruct", category: "Qwen" },
  { label: "Qwen 2.5 32B", value: "qwen/qwen-2.5-32b-instruct", category: "Qwen" },
  { label: "Qwen 2.5 14B", value: "qwen/qwen-2.5-14b-instruct", category: "Qwen" },
  { label: "Qwen 2.5 7B", value: "qwen/qwen-2.5-7b-instruct", category: "Qwen" },
  { label: "Qwen 2 72B", value: "qwen/qwen-2-72b-instruct", category: "Qwen" },
  { label: "Qwen 2 7B", value: "qwen/qwen-2-7b-instruct", category: "Qwen" },
  { label: "QwQ 32B Preview", value: "qwen/qwq-32b-preview", category: "Qwen" },
  
  // DeepSeek Models
  { label: "DeepSeek V3", value: "deepseek/deepseek-v3", category: "DeepSeek" },
  { label: "DeepSeek Chat", value: "deepseek/deepseek-chat", category: "DeepSeek" },
  { label: "DeepSeek Coder", value: "deepseek/deepseek-coder", category: "DeepSeek" },
  { label: "DeepSeek R1", value: "deepseek/deepseek-r1", category: "DeepSeek" },
  
  // Nous Research Models
  { label: "Nous Hermes 2 Yi 34B", value: "nousresearch/nous-hermes-2-yi-34b", category: "Nous Research" },
  { label: "Nous Hermes 2 Mixtral 8x7B", value: "nousresearch/nous-hermes-2-mixtral-8x7b-dpo", category: "Nous Research" },
  { label: "Nous Hermes 2 Llama 70B", value: "nousresearch/nous-hermes-llama2-70b", category: "Nous Research" },
  { label: "Nous Hermes 2 Llama 13B", value: "nousresearch/nous-hermes-llama2-13b", category: "Nous Research" },
  { label: "Nous Capybara 7B", value: "nousresearch/nous-capybara-7b", category: "Nous Research" },
  
  // Anthropic-like Models
  { label: "Claude 3 Haiku (Self-Moderated)", value: "anthropic/claude-3-haiku:beta", category: "Anthropic" },
  { label: "Claude 3 Sonnet (Self-Moderated)", value: "anthropic/claude-3-sonnet:beta", category: "Anthropic" },
  { label: "Claude 3 Opus (Self-Moderated)", value: "anthropic/claude-3-opus:beta", category: "Anthropic" },
  
  // OpenChat Models
  { label: "OpenChat 3.5", value: "openchat/openchat-3.5-1210", category: "OpenChat" },
  { label: "OpenChat 7B", value: "openchat/openchat-7b", category: "OpenChat" },
  
  // Hugging Face Models
  { label: "Zephyr 7B Beta", value: "huggingfaceh4/zephyr-7b-beta", category: "Hugging Face" },
  { label: "Zephyr 7B Alpha", value: "huggingfaceh4/zephyr-7b-alpha", category: "Hugging Face" },
  { label: "StarChat Beta", value: "huggingfaceh4/starchat-beta", category: "Hugging Face" },
  
  // Databricks Models
  { label: "DBRX Instruct", value: "databricks/dbrx-instruct", category: "Databricks" },
  
  // 01-ai Models
  { label: "Yi 34B Chat", value: "01-ai/yi-34b-chat", category: "01-ai" },
  { label: "Yi 6B", value: "01-ai/yi-6b", category: "01-ai" },
  
  // Alpaca Models
  { label: "Alpaca 7B", value: "alpaca/alpaca-7b", category: "Alpaca" },
  
  // Vicuna Models
  { label: "Vicuna 13B", value: "lmsys/vicuna-13b-v1.5", category: "LMSYS" },
  { label: "Vicuna 7B", value: "lmsys/vicuna-7b-v1.5", category: "LMSYS" },
  
  // Together Models
  { label: "RedPajama INCITE 7B Chat", value: "togethercomputer/redpajama-incite-7b-chat", category: "Together" },
  { label: "RedPajama INCITE 3B Chat", value: "togethercomputer/redpajama-incite-3b-chat", category: "Together" },
  { label: "Falcon 7B Instruct", value: "tiiuae/falcon-7b-instruct", category: "TII UAE" },
  { label: "Falcon 40B Instruct", value: "tiiuae/falcon-40b-instruct", category: "TII UAE" },
  
  // Stability AI Models
  { label: "StableLM Zephyr 3B", value: "stabilityai/stablelm-zephyr-3b", category: "Stability AI" },
  { label: "StableCode Instruct Alpha 3B", value: "stabilityai/stablecode-instruct-alpha-3b", category: "Stability AI" },
  
  // Phind Models
  { label: "Phind CodeLlama 34B v2", value: "phind/phind-codellama-34b", category: "Phind" },
  
  // Airoboros Models
  { label: "Airoboros 70B", value: "jondurbin/airoboros-l2-70b", category: "Jondurbin" },
  
  // WizardCoder Models
  { label: "WizardCoder Python 34B", value: "wizardlm/wizardcoder-python-34b", category: "WizardLM" },
  { label: "WizardCoder 15B", value: "wizardlm/wizardcoder-15b", category: "WizardLM" },
  
  // Synthia Models
  { label: "Synthia 70B", value: "migtissera/synthia-70b", category: "Migtissera" },
  
  // Pygmalion Models
  { label: "Pygmalion 2 13B", value: "pygmalionai/mythalion-13b", category: "PygmalionAI" },
  
  // Chronos Models
  { label: "Chronos Hermes 13B", value: "austism/chronos-hermes-13b", category: "Austism" },
  
  // Neural Chat Models
  { label: "Neural Chat 7B", value: "intel/neural-chat-7b", category: "Intel" },
  
  // OpenHermes Models
  { label: "OpenHermes 2.5 Mistral 7B", value: "teknium/openhermes-2.5-mistral-7b", category: "Teknium" },
  
  // Dolphin Models
  { label: "Dolphin 2.5 Mixtral 8x7B", value: "cognitivecomputations/dolphin-2.5-mixtral-8x7b", category: "Cognitive Computations" },
  { label: "Dolphin 2.6 Phi 2", value: "cognitivecomputations/dolphin-2.6-phi-2", category: "Cognitive Computations" },
  
  // Orca Models
  { label: "Orca 2 13B", value: "microsoft/orca-2-13b", category: "Microsoft" },
  { label: "Orca 2 7B", value: "microsoft/orca-2-7b", category: "Microsoft" },
  
  // Pplx Models
  { label: "PPLX 7B Online", value: "perplexity/pplx-7b-online", category: "Perplexity" },
  { label: "PPLX 70B Online", value: "perplexity/pplx-70b-online", category: "Perplexity" },
  { label: "PPLX 7B Chat", value: "perplexity/pplx-7b-chat", category: "Perplexity" },
  { label: "PPLX 70B Chat", value: "perplexity/pplx-70b-chat", category: "Perplexity" },
  
  // Solar Models
  { label: "Solar 10.7B Instruct", value: "upstage/solar-1-mini-chat", category: "Upstage" },
  
  // Bagel Models
  { label: "Bagel 34B", value: "jondurbin/bagel-34b", category: "Jondurbin" },
  
  // Goliath Models
  { label: "Goliath 120B", value: "alpindale/goliath-120b", category: "Alpindale" },
  
  // Mixtral Models (additional)
  { label: "Mixtral 8x7B Base", value: "mistralai/mixtral-8x7b", category: "Mistral" },
  { label: "Mixtral 8x22B Base", value: "mistralai/mixtral-8x22b", category: "Mistral" },
  
  // Additional Code Models
  { label: "CodeBooga 34B", value: "oobabooga/deepseek-coder-33b-instruct", category: "Oobabooga" },
  { label: "MagiCoder S DS 6.7B", value: "ise-uiuc/magicoder-s-ds-6.7b", category: "ISE UIUC" },
  
  // Experimental Models
  { label: "LLaVA 13B", value: "liuhaotian/llava-13b", category: "LLaVA" },
  { label: "Claude 1 Instant", value: "anthropic/claude-instant-1", category: "Anthropic" },
  { label: "Claude 1", value: "anthropic/claude-1", category: "Anthropic" },
  
  // Additional Qwen Models
  { label: "Qwen 1.5 110B Chat", value: "qwen/qwen1.5-110b-chat", category: "Qwen" },
  { label: "Qwen 1.5 72B Chat", value: "qwen/qwen1.5-72b-chat", category: "Qwen" },
  { label: "Qwen 1.5 32B Chat", value: "qwen/qwen1.5-32b-chat", category: "Qwen" },
  { label: "Qwen 1.5 14B Chat", value: "qwen/qwen1.5-14b-chat", category: "Qwen" },
  { label: "Qwen 1.5 7B Chat", value: "qwen/qwen1.5-7b-chat", category: "Qwen" },
  { label: "Qwen 1.5 4B Chat", value: "qwen/qwen1.5-4b-chat", category: "Qwen" },
  { label: "Qwen 1.5 1.8B Chat", value: "qwen/qwen1.5-1.8b-chat", category: "Qwen" },
  { label: "Qwen 1.5 0.5B Chat", value: "qwen/qwen1.5-0.5b-chat", category: "Qwen" },
  
  // Additional Meta Models
  { label: "Llama Guard 7B", value: "meta-llama/llamaguard-7b", category: "Meta" },
  { label: "Llama Guard 2 8B", value: "meta-llama/llamaguard-2-8b", category: "Meta" },
  
  // More Specialized Models
  { label: "ReMM SLERP L2 13B", value: "undi95/remm-slerp-l2-13b", category: "Undi95" },
  { label: "Toppy M 7B", value: "undi95/toppy-m-7b", category: "Undi95" },
  { label: "MythoMax L2 13B", value: "gryphe/mythomax-l2-13b", category: "Gryphe" },
  { label: "MythoMist 7B", value: "gryphe/mythomist-7b", category: "Gryphe" },
  
  // Vision Models
  { label: "LLaVA 1.5 7B", value: "liuhaotian/llava-v1.5-7b", category: "LLaVA" },
  { label: "LLaVA 1.5 13B", value: "liuhaotian/llava-v1.5-13b", category: "LLaVA" },
  { label: "Moondream 2", value: "vikhyatk/moondream2", category: "Vikhyatk" },
  
  // Recent Models
  { label: "Yi 1.5 34B Chat", value: "01-ai/yi-1.5-34b-chat", category: "01-ai" },
  { label: "Yi 1.5 9B Chat", value: "01-ai/yi-1.5-9b-chat", category: "01-ai" },
  { label: "Yi 1.5 6B Chat", value: "01-ai/yi-1.5-6b-chat", category: "01-ai" },
  
  // Hermes Models
  { label: "Hermes 2 Pro Mistral 7B", value: "nousresearch/hermes-2-pro-mistral-7b", category: "Nous Research" },
  { label: "Hermes 2 Theta Llama 3 8B", value: "nousresearch/hermes-2-theta-llama-3-8b", category: "Nous Research" },
  
  // FireFunction Models
  { label: "FireFunction v1", value: "fireworks-ai/firefunction-v1", category: "Fireworks AI" },
  
  // Additional Specialized Models
  { label: "Stripedhyena Nous 7B", value: "togethercomputer/stripedhyena-nous-7b", category: "Together" },
  { label: "Llama 2 70B Code Instruct", value: "codellama/codellama-70b-instruct", category: "CodeLlama" },
  
  // More Recent Additions
  { label: "Gemma 7B IT", value: "google/gemma-7b-it", category: "Google" },
  { label: "Gemma 2B IT", value: "google/gemma-2b-it", category: "Google" },
  { label: "Gemma 2 9B IT", value: "google/gemma-2-9b-it", category: "Google" },
  { label: "Gemma 2 27B IT", value: "google/gemma-2-27b-it", category: "Google" },
  
  // Noromaid Models
  { label: "Noromaid 20B", value: "neversleep/noromaid-20b", category: "NeverSleep" },
  { label: "Noromaid Mixtral 8x7B", value: "neversleep/noromaid-mixtral-8x7b-instruct", category: "NeverSleep" },
];
