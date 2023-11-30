/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-26 11:39:23
 * @LastEditTime: 2022-06-03 23:47:08
 */
import { computed, createVNode, defineComponent, ref, unref } from 'vue';
import { Input } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
export const InputSearch = defineComponent({
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '340px',
    },
  },
  setup(props, { emit }) {
    const showSearch = ref<Boolean>(true);
    const searchValue = computed({
      get: () => {
        showSearch.value = !props.value;
        return props.value;
      },
      set: (val) => {
        val = val.trim();
        showSearch.value = !val;
        emit('update:value', val);
        !val && emit('search');
      },
    });
    return () => (
      <Input
        allow-clear
        onPressEnter={() => emit('search')}
        style={{ width: props.width }}
        placeholder={props.placeholder}
        v-model={[searchValue.value, 'value']}
      >
        {{
          suffix: () =>
            unref(showSearch)
              ? createVNode(SearchOutlined, {
                  onClick: () => {
                    emit('search');
                  },
                })
              : null,
        }}
      </Input>
    );
  },
});
