<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-25 20:34:23
 * @LastEditTime: 2022-04-20 15:20:18
-->
<template>
  <div class="acl">
    <div class="header">可访问IP地址设置</div>
    <Spin :spinning="loading">
      <div class="content">
        <a-radio-group v-model:value="aclValue">
          <a-radio :value="1" class="noacl crad"> 任意IP地址 </a-radio>
          <a-radio :value="2" class="noacl crad"> 仅以下IP地址 </a-radio>
        </a-radio-group>
        <div v-if="aclValue === 2" class="ipAdd">
          <template v-for="(item, index) in ips" :key="item.key">
            <ip-addr ref="ip" :ipAddress="ipAddress">
              <template #last>
                <li>
                  <a-input
                    ref="ipInput"
                    v-model:value.trim="state[item.key]"
                    type="text"
                    class="ipInputClass"
                    @input="checkIpVal(item['key'], state[item['key']])"
                  />
                  <div></div>
                </li>
              </template>
            </ip-addr>
            <MinusOutlined v-if="index < 1" class="line" />
          </template>
          <a-button type="primary" class="ant-btn-add" @click="addIp">
            添加
          </a-button>
          <div class="tagBox">
            <template
              v-for="({ ip_begin, ip_end }, index) in ipArr"
              :key="index"
            >
              <a-tag class="tagSelf" closable @close="deleteIp(index)">
                {{ ip_begin + " - " + ip_end }}
              </a-tag>
            </template>
          </div>
        </div>
        <div>
          <a-button type="primary" @click="commit" :loading="btnLoading">
            保存并应用
          </a-button>
        </div>
      </div>
    </Spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, unref } from "vue";
import { ipAddr } from "@hydra/components/ip-addr";
import { MinusOutlined } from "@ant-design/icons-vue";
import { message, Tag, Spin } from "ant-design-vue";
import { validateIp } from "@hydra/utils/reg";
import { updateIpControlApi, getIpControlApi } from "@/api/config";
export default defineComponent({
  components: {
    ipAddr,
    MinusOutlined,
    [Tag.name]: Tag,
    Spin,
  },
  setup() {
    //loading
    const loading = ref(false);
    const btnLoading = ref(false);
    //ip地址段
    const ips = [
      {
        key: "ippre",
      },
      {
        key: "ipnext",
      },
    ];
    //ip值和段
    const state = reactive({
      ippre: "",
      ipnext: "",
      ipAddress: [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "",
        },
      ],
      ipArr: [],
    });
    //acl控制方式
    const aclValue = ref<number>(1);
    // 检查ip输入为0-255
    const checkIpVal = (type, val) => {
      //确保每个值都处于0-255
      // 处理非数字
      state[type] = val.toString().replace(/[^0-9]/g, "");
      state[type] = parseInt(val, 10);
      if (isNaN(val)) {
        state[type] = "";
      } else {
        state[type] = val < 0 ? 0 : val;
        state[type] = val > 255 ? 255 : val;
      }
    };

    // 添加ip地址段
    const addIp = async () => {
      let ipCommon = "";
      state.ipAddress.forEach((item) => {
        ipCommon += item.value + ".";
      });
      const ip_begin = ipCommon + state.ippre;
      const ip_end = ipCommon + state.ipnext;
      try {
        await validateIp(undefined, ip_begin);
        await validateIp(undefined, ip_end);
      } catch {
        message.error("保存错误");
        return;
      }
      state.ipArr.push({
        ip_begin,
        ip_end,
      } as never);
    };

    // 删除ip地址段
    const deleteIp = async (index) => {
      state.ipArr.splice(index, 1);
    };

    // 获取可访问ip地址
    const getIpControl = async () => {
      loading.value = true;
      const { enabled, items } = await getIpControlApi();
      aclValue.value = enabled ? 2 : 1;
      state.ipArr = items;
      loading.value = false;
    };
    getIpControl();

    // 保存可访问ip地址
    const commit = async () => {
      if (!state.ipArr.length && unref(aclValue) === 2) {
        message.error("请添加IP地址段");
        return;
      }
      const enabled = unref(aclValue) !== 1;
      btnLoading.value = true;
      await updateIpControlApi({
        enabled,
        items: state.ipArr,
      });
      btnLoading.value = false;
    };

    return {
      state,
      ...toRefs(state),
      aclValue,
      ips,
      checkIpVal,
      addIp,
      commit,
      loading,
      deleteIp,
      btnLoading,
    };
  },
});
</script>

<style lang="less" scoped>
.header {
  height: 64px;
  line-height: 64px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: #293038;
}
.content {
  padding: 0 60px;
}
.crad {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
  display: block;
}
.noacl {
  margin-bottom: 24px;
}
li {
  position: relative;
  height: 36px;
  margin: 0;
  list-style-type: none;
}
.ipInputClass {
  border: none;
  width: 49px;
  height: 36px;
  text-align: center;
  background: transparent;
  /*取消掉默认的input focus状态*/
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.line {
  margin: 0 10px;
  color: #ddd;
}
.ant-btn-add {
  height: 36px;
  margin-left: 20px;
}
.tagSelf {
  border: none;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
  line-height: 24px;
  height: 24px;
  padding-right: 7px;
  color: #267ee5;
  background: rgba(38, 126, 229, 0.1);
  &:hover {
    padding-right: 20px;
    ::v-deep(.anticon) {
      transform: scale(1);
    }
  }
  ::v-deep(.anticon) {
    transition: all 0.4s;
    position: absolute;
    right: 3px;
    top: 7px;
    color: #267ee5;
    transform: scale(0);
  }
}
</style>
