export interface IFormItem {
  field: string;
  defaultValue?: any;
  type: string;
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: any[];
  otherOptions?: any;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}
