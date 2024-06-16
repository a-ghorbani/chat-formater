import { TemplateConfig } from '../types';

const chatMLTemplate: TemplateConfig = {
  bosToken: '',
  eosToken: '',
  // prettier-ignore
  chatTemplate:
    "{%- if messages[0].role == 'system' -%}" +
    "   {%- set offset = 1 -%}" +
    "{%- else %}" +
    "    {%- set offset = 0 -%}" +
    "{%- endif -%}" +
    "{{- bos_token -}}" +
    "{%- for message in messages -%}" +
    "    {%- if (message.role == 'user') != (loop.index0 % 2 == offset) -%}" +
    "        {{ raise_exception('Conversation roles must alternate user/assistant/user/assistant/...') }}" +
    "    {%- endif -%}" +
    "    {{- '<|im_start|>' + message.role + '\n' + message.content | trim + '<|im_end|>\n' -}}" +
    "{%- endfor -%}" +
    "{%- if add_generation_prompt -%}" +
    "    {{- '<|im_start|>assistant\n' -}}" +
    "{%- endif -%}"
};

export default chatMLTemplate;
