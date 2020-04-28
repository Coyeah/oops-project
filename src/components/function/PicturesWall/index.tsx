/*
 * @Author: ye.chen
 * @Date: 2020-04-13 15:16:12
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-17 15:35:42
 */
import React from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadProps, UploadChangeParam } from 'antd/lib/upload';
import { uploadInitProps } from '@/utils/upload';

const uploadBtn = (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">添加</div>
  </div>
);

export interface PicturesWallProps extends Omit<UploadProps, 'onChange'> {
  readOnly?: boolean;
  length?: number;
  original?: boolean;
  value?: AnyObject[];
  onChange?: (value: any[]) => void;
}

export default class PicturesWall extends React.PureComponent<PicturesWallProps> {
  state = {
    fileList: [],
  };

  componentDidMount() {
    const { value } = this.props;
    value && this.setValue(value);
  }

  componentWillReceiveProps(nextProps: PicturesWallProps) {
    Reflect.has(nextProps, 'value') &&
      JSON.stringify(nextProps.value) != JSON.stringify(this.state.fileList) &&
      this.setValue(nextProps.value);
  }

  setValue = (value: AnyObject[] = []) => {
    this.setState({
      fileList: value.map((i: AnyObject, idx) => ({ ...i, uid: i.mediaId || `${idx + 1}` })),
    });
  };

  onChange = (info: UploadChangeParam) => {
    const {
      file,
      fileList,
      file: { response: res, status },
    } = info;
    this.setState({ fileList });
    let newFileList = [...fileList];
    if (status === 'done') {
      const { code, data, msg } = res;
      if (!code) {
        newFileList = fileList.map((i: any) => (i.uid === file.uid ? { ...i, ...data } : { ...i }));
      } else {
        newFileList = fileList.filter((i) => i.uid != file.uid);
        message.error(msg);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
    this.setState({ fileList: newFileList });
    this.props.onChange && this.props.onChange(newFileList);
  };

  isOverLength = (file: AnyObject, fileList: AnyObject[]) => {
    const { length = 5 } = this.props;
    const count = fileList.findIndex((i) => i.uid == file.uid) + 1;
    return this.state.fileList.length + count > length;
  };
  isOverSize = (file: AnyObject, mb = 10) => {
    return file.size > mb * 1024 * 1024;
  };

  beforeUpload = (file: AnyObject, fileList: AnyObject[]) =>
    new Promise((resolve, reject) => {
      const { accept = uploadInitProps.accept } = this.props;
      if (this.isOverLength(file, fileList)) {
        message.warning('上传数量超限');
        reject(file);
      }
      if (this.isOverSize(file)) {
        message.warning('上传图片大小限制在10M内');
        reject(file);
      }
      if (
        accept &&
        !accept.split(',').some((i) => new RegExp(`${i.trim()}$`, 'i').test(file.name))
      ) {
        message.warning(`仅支持 ${accept} 等文件格式`);
        reject(file);
      }
      resolve(file);
    });

  render() {
    const { fileList } = this.state;
    const {
      readOnly,
      accept = uploadInitProps.accept,
      original,
      length = 5,
      ...restProps
    } = this.props;

    const rest: UploadProps = {
      ...uploadInitProps,
      ...restProps,
      accept,
      listType: 'picture-card',
      withCredentials: true,
      multiple: true,
      fileList,
      showUploadList: {
        showRemoveIcon: !readOnly,
      },
      onChange: this.onChange,
    };
    return (
      <div>
        <Upload {...rest}>{fileList.length >= length || readOnly ? null : uploadBtn}</Upload>
      </div>
    );
  }
}
