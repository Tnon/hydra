/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-28 16:58:32
 * @LastEditTime: 2022-05-10 13:58:31
 */
import { defineComponent } from 'vue';
import { Badge } from 'ant-design-vue';

export const intectFile = defineComponent({
  components: {
    Badge,
  },
  props: {
    text: String,
  },
  setup(props) {
    return () => (
      <>
        <Badge color={props.text ? '#ff3543' : '#1afa29'}></Badge>
        <span style={{ color: props.text ? '#ff3543' : '#1afa29' }}>{props.text || '未检出'}</span>
      </>
    );
  },
});
