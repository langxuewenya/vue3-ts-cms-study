export interface IFormItem {
  field: string;
  defaultValue?: any;
  type: string;
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: any[];
  otherOptions?: any;
  disabled?: boolean;
}
