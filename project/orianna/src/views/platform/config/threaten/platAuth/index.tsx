import { Button, message, Spin } from 'ant-design-vue';
import { defineComponent, onMounted, ref, unref } from 'vue';
import styles from './index.module.less';
import cunstomIcon from '@hydra/components/custom-icon';
import { getAuthLic, uploadLic } from '@/api/platform/config';
import uploadFile from '@/components/upload-file';
import { LICSTATUS } from '@/enums/statusEnum';
export const platAuth = defineComponent({
  components: {
    cunstomIcon,
    uploadFile,
  },
  setup() {
    const nodes = ref([
      {
        title: '系统版本',
        value: '',
        key: 'sys_ver',
      },
      {
        title: '特征库版本',
        value: '',
        key: 'behavior',
      },
      {
        title: '系统SN号',
        value: '',
        key: 'sn',
      },
      {
        title: '威胁情报版本',
        value: '',
        key: 'threaten',
      },
      {
        title: '自动检测（月）',
        value: '',
        key: 'auto_total',
      },
      {
        title: '专家检测（次）',
        value: '',
        key: 'expert_total',
      },
      {
        title: '平台到期时间',
        value: '',
        key: 'expire_time',
      },
    ]);
    const loading = ref(false);
    //是否授权
    const isAuth = ref<LICSTATUS>(LICSTATUS.NO);
    //获取license
    const getLic = async () => {
      loading.value = true;
      const res = await getAuthLic();
      //   0 未授权 1 已授权 2 授权过期
      if (res.status !== LICSTATUS.NO) {
        nodes.value.forEach((ele) => {
          ele.value = res[ele.key];
        });
      }
      isAuth.value = res.status;
      loading.value = false;
    };
    onMounted(() => {
      getLic();
    });
    //授权loading
    const uploading = ref(false);
    //上传lic校验
    const beforeUpload = async (file) => {
      if (file.name.endsWith('.lic')) {
        const formData = new FormData();
        uploading.value = true;
        formData.append('file', file as any);
        await uploadLic(formData);
        uploading.value = false;
        //获取license
        await getLic();
      } else {
        message.error('请上传license文件');
        return false;
      }
    };
    return () => (
      <Spin spinning={loading.value}>
        <div class={styles.content}>
          <div class={styles.header}>平台授权</div>
          <div class={[styles.authBar, isAuth.value === LICSTATUS.OK ? styles.isAuth : '']}>
            <div class={styles.anthStatus}>
              <cunstomIcon class={styles.icon} type="#axysxshouquanrenzheng" />
              <span class={styles.text}>
                {isAuth.value === LICSTATUS.OK
                  ? '已授权'
                  : isAuth.value === LICSTATUS.NO
                  ? '未授权'
                  : '授权过期'}
              </span>
            </div>
            <span>
              <uploadFile accept={'.lic'} beforeUpload={beforeUpload}>
                <Button type="primary" loading={uploading.value}>
                  立即授权
                </Button>
              </uploadFile>
              {/* <Button style={{ marginLeft: '10px' }}>导入特征库</Button> */}
            </span>
          </div>
          {unref(nodes.value).map((item) => (
            <div class={styles.node}>
              <div class={styles.title}>{item.title}</div>
              <div class={styles.value}>{item.value}</div>
            </div>
          ))}
        </div>
      </Spin>
    );
  },
});
