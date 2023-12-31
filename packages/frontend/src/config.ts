import { LogtoConfig } from "@logto/react";
import { logto_endpoint, logto_app_id, logto_api_resource } from "./env";

// Logtoクライアントの設定
// 環境変数より取得
const logto_config: LogtoConfig = {
  endpoint: logto_endpoint,
  appId: logto_app_id,
  resources: [logto_api_resource],
};

export { logto_config };
