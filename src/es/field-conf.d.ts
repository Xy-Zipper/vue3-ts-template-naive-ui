export interface BaseFieldSchema<C extends Record<string, unknown> = {}> {
  __config__: C & {
    jdcloudKey: string;
    label: string;
    defaultValue: unknown;
    children?: BaseFieldSchema[];
    required: boolean;
    showLabel: boolean;
    renderKey: number;
  };
  readonly: boolean;
  __vModel__: string;
  disabled: boolean;
}
