/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 对话密钥已改为服务端 LLM_*，前端不再需要 VITE_LLM_*
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
