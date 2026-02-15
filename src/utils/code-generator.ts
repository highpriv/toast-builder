import type { NotificationConfig } from "@/types";

export const generateVueCode = (config: NotificationConfig): string => {
  const lines: string[] = [
    '<script setup lang="ts">',
    "import { useToast } from '@/composables/useToast';",
    "",
    "const { showToast } = useToast();",
    "",
    "const showNotification = () => {",
    "  showToast({",
  ];

  lines.push(`    type: '${config.type}',`);
  if (config.title) {
    lines.push(`    title: '${escapeString(config.title)}',`);
  }
  lines.push(`    message: '${escapeString(config.message)}',`);
  lines.push(`    duration: ${config.duration},`);
  lines.push(`    position: '${config.position}',`);
  lines.push(`    backgroundColor: '${config.backgroundColor}',`);
  lines.push(`    textColor: '${config.textColor}',`);
  lines.push(`    showIcon: ${config.showIcon},`);
  lines.push(`    showCloseButton: ${config.showCloseButton},`);

  if (config.customIcon) {
    lines.push(`    customIcon: '${config.customIcon}',`);
  }
  if (config.animation) {
    lines.push(`    animation: '${config.animation}',`);
  }
  if (config.showProgress !== undefined) {
    lines.push(`    showProgress: ${config.showProgress},`);
  }

  lines.push(
    "  });",
    "};",
    "</script>",
    "",
    "<template>",
    '  <button @click="showNotification">Show Toast</button>',
    "</template>",
  );

  return lines.join("\n");
};

export const generateJSCode = (config: NotificationConfig): string => {
  const configObj = {
    type: config.type,
    ...(config.title && { title: config.title }),
    message: config.message,
    duration: config.duration,
    position: config.position,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    showIcon: config.showIcon,
    showCloseButton: config.showCloseButton,
    ...(config.customIcon && { customIcon: config.customIcon }),
    ...(config.animation && { animation: config.animation }),
    ...(config.showProgress !== undefined && {
      showProgress: config.showProgress,
    }),
  };

  const lines: string[] = [
    "const toastConfig = " + JSON.stringify(configObj, null, 2) + ";",
    "",
    "showToast(toastConfig);",
  ];

  return lines.join("\n");
};

const escapeString = (str: string): string => {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
};
