import { FormProps, FormInstance, FormItemProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import { AutodataParams } from '../autodata';

export type DialogOpenFunc = (props: DialogOpenProps) => void;

export type DialogPromptFunc = (props: DialogPromptProps) => void;

export type BaseDialogFuncProps = {
  /** withSetProps 中合并 state 与 props 的配置 */
  setPropsMerged?: boolean;
  /** 弹窗弹出延时 */
  delay?: number;
  /** 确认/取消后自动关闭弹窗 */
  autoClose?: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 启用 autodata，数据为 autodata 传入参数 */
  autodata?: AutodataParams | AutodataParams[];
  /** 预设的 state */
  state?: object;
} & DialogFormProps &
  DialogProps &
  FormProps;

export type DialogOpenProps = BaseDialogFuncProps & ModalProps;

export type DialogPromptProps = BaseDialogFuncProps &
  ModalProps & {
    formItemProps?: AnyObject;
    name: string;
    label?: string;
    required?: boolean;
    message?: string;
    node?: React.ReactNode;
    initialValue?: any;
  };

export interface DialogProps {
  /** antd form 实例 */
  form?: FormInstance;
  /** 点击确定回调 */
  onOk?: (...args: any[]) => any;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onCancel?: (...args: any[]) => any;
  /** 是否隐藏取消按钮 */
  noCancel?: boolean;
  /** 是否动画 */
  transition?: boolean;
  /** 内容 */
  render?: (args: any) => React.ReactElement;
  content?: React.ReactNode;
  /** 头部 */
  title?: React.ReactNode | string;
  titleRender?: (args: any) => React.ReactElement | Function;
  /** 底部 */
  footerRender?: (args: any) => React.ReactElement | Function;
  /** 确认按钮是否正在加载 */
  confirmLoading?: boolean;
  /** 确认按钮文字 */
  okText?: React.ReactNode;
  /** 取消按钮文字 */
  cancelText?: React.ReactNode;
  /** 控制最后渲染数据，优先级最高 */
  dominate?: (args: any) => object;
  props?: object;
  formProps?: DialogFormProps & FormProps;
}

export interface DialogFormProps {
  action?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
  valuesFilter?: (values: object) => object;
  onSubmitted?: (body: object) => void;
  onError?: Function;
}
