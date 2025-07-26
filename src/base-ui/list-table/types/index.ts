export interface IPropsList {
  prop: string;
  label?: string;
  minWidth?: string;
  align?: string;
  slotName?: string;
  isEnum?: boolean;
  optionMap?: Record<string, any>; // Record<K, T>: 内置类型工具，这里表示对象的所有key为字符串，value可以是任意类型
}
