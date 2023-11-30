/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-04 15:57:15
 * @LastEditTime: 2021-07-04 16:03:27
 */
export interface ModalProps {
  container: Function;
  title: string;
  remove: Function;
  handleOk: Function;
  contentProps: object;
  content: object;
  footer: boolean;
  subtitle: string | object;
  width: number;
  wrapClassName: string;
  maskClosable: boolean;
}
