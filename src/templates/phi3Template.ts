import { TemplateConfig } from '../types';

const phi3Template: TemplateConfig = {
  bosToken: '<s>',
  eosToken: '<|endoftext|>',
  // prettier-ignore
  chatTemplate:
    "{%- if messages[0].role == 'system' -%}" +
    "    {%- set offset = 1 -%}" +
    "{%- else -%}" +
    "    {%- set offset = 0 -%}" +
    "{%- endif -%}" +
    "{{- bos_token -}}" +
    "{%- for message in messages -%}" +
    "    {%- if (message.role == 'user') != (loop.index0 % 2 == offset) -%}" +
    "        {{- raise_exception('Conversation roles must alternate user/assistant/user/assistant/...') -}}" +
    "    {%- endif -%}" +
    "    {{- '<|' + message.role + '|>\n' + message.content | trim + '<|end|>' + '\n' -}}" +
    "{%- endfor -%}" +
    "{%- if add_generation_prompt -%}" +
    "    {{- '<|assistant|>\n' -}}" +
    "{%- endif -%}"
};

export default phi3Template;
