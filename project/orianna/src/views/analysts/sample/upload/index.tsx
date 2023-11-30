/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-28 16:51:05
 * @LastEditTime: 2022-04-20 12:02:35
 */
// import uploadReport from './index.vue'
// export { uploadReport }
import { uploadResultForm } from '@/api/analysts/sample';
import { ANASTATUS } from '@/enums/statusEnum';
import { useModal } from '@/hooks/use-modal';
import { defineComponent, PropType } from 'vue';
import classes from './index.module.less';
import customForm from './index.vue';
export const uploadReport = defineComponent({
  props: {
    text: {
      type: Number as PropType<ANASTATUS>,
      required: true,
    },
    id: String,
    refreshTable: Function,
  },
  setup(props) {
    const uploadResult = () => {
      useModal(
        {
          title: '上传结果',
          handleOk: async ({ formState, validate }) => {
            await validate();
            const formData = new FormData();
            const formObj = Object.assign({}, formState, { id: props.id });
            for (const k in formObj) {
              formData.append(k, formObj[k]);
            }
            await uploadResultForm(formData as any);
            props.refreshTable!(true);
          },
        },
        customForm,
      );
    };
    return () =>
      props.text === ANASTATUS.FINISH ? (
        <span class={classes.success}>已完成</span>
      ) : (
        <span class={classes.noupload} onClick={() => uploadResult()}>
          上传结果
        </span>
      );
  },
});
