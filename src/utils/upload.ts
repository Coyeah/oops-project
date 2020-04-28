import { UploadProps } from 'antd/lib/upload';

const acceptType = '.png,.gif,.jpg,.jpeg,.bmp';

export const uploadInitProps: UploadProps = {
  accept: acceptType,
  action: '/wmc/media/image/upload',
  headers: { accessKey: '208743' },
  withCredentials: true,
  showUploadList: false,
  multiple: false,
};
