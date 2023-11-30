import { VNode } from 'vue';
import { FormItemProps } from 'ant-design-vue/lib/form/FormItem';
import { ValidationRule } from 'ant-design-vue/lib/form/Form';

declare interface OptionItem {
  label: string;
  value: string | number;
  [key: string]: any;
}

type Rule = ValidationRule & {
  trigger?: 'blur' | 'change' | string['blur' | 'change'];
};
declare interface FormItem extends Partial<typeof FormItemProps> {
  type?:
    | 'input'
    | 'password'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'inputNumber'
    | 'inputRange'
    | 'switch'
    | VNode
    | 'component';
  label?: string;
  field?: string;
  value?: any;
  rules?: Rule[];
  options?: OptionItem[];
  eventObject?: object;
  asyncOptions?: () => any;
  placeholder?: string;
  extraSlot?: Boolean;
  [key: string]: any;
  // validPwd?: (...rest) => any
}
