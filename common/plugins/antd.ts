/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-29 09:31:11
 * @LastEditTime: 2021-08-18 17:41:41
 */
import type { App } from 'vue';

import {
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Pagination,
  Switch,
  Button,
  Select,
  Row,
  Col,
  DatePicker,
  Popconfirm,
} from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.dark.css';
export function setupAntd(app: App<Element>) {
  app
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Select)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Switch)
    .use(Pagination)
    .use(Button)
    .use(Row)
    .use(Col)
   
    .use(DatePicker)
    .use(Popconfirm)
}
