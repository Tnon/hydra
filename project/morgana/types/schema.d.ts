/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-22 15:31:53
 * @LastEditTime: 2022-04-22 15:33:46
 */
import { VNode } from 'vue';
import { FormItemProps } from 'ant-design-vue/lib/form/FormItem';

declare interface OptionItem {
  label: string;
  value: string | number;
  [key: string]: any;
}

type Rule = {
  trigger?: 'blur' | 'change';
};
declare interface FormItem extends Partial<FormItemProps> {
  type?:
    | 'input'
    | 'password'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'input-number'
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
