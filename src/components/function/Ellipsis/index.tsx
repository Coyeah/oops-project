/*
 * @Author: ye.chen
 * @Date: 2020-04-29 11:34:34
 * @Last Modified by: ye.chen
 * @Last Modified time: 2020-04-29 18:17:01
 */
import React from 'react';
import classNames from 'classnames';
import { EllipsisProps, EllipsisState } from './types';
import styles from './index.less';
import EllipsisText from './EllipsisText';
import GetTooltip from './GetTooltip';
import { tooltipOverlayStyle } from './utils';

const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

// 文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。

export default class Ellipsis extends React.PureComponent<EllipsisProps, EllipsisState> {
  public node?: HTMLSpanElement;
  public root?: HTMLDivElement;
  public content?: HTMLDivElement;
  public shadow?: HTMLDivElement;
  public shadowChildren?: HTMLDivElement;

  state = {
    text: '',
    targetCount: 0,
  };

  componentDidMount() {
    if (this.node) this.computeLine();
  }

  componentDidUpdate(preProps: EllipsisProps) {
    const { lines } = this.props;
    if (lines !== preProps.lines) this.computeLine();
  }

  computeLine = () => {
    const { lines } = this.props;
    if (lines && !isSupportLineClamp) {
      const text: string =
        (this.shadowChildren as HTMLDivElement).innerText ||
        (this.shadowChildren as HTMLDivElement).textContent ||
        '';
      const lineHeight = parseInt(getComputedStyle(this.root as HTMLDivElement).lineHeight, 10);
      const targetHeight = lines * lineHeight;
      (this.content as HTMLDivElement).style.height = `${targetHeight}px`;
      const totalHeight = (this.shadowChildren as HTMLDivElement).offsetHeight;
      const shadowNode = (this.shadow as HTMLDivElement).firstChild as HTMLDivElement;

      if (totalHeight <= targetHeight) {
        this.setState({
          text,
          targetCount: text.length,
        });
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode);

      this.setState({
        text,
        targetCount: count,
      });
    }
  };

  bisection = (
    th: number,
    m: number,
    b: number,
    e: number,
    text: string,
    shadowNode: HTMLElement,
  ): number => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      if (end - begin === 1) {
        mid = 1 + begin;
      } else {
        mid = Math.floor((end - begin) / 2) + begin;
      }
      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return this.bisection(th, mid, begin, end, text, shadowNode);
  };

  handleRoot = (n?: HTMLDivElement | null) => {
    this.root = n || void 0;
  };

  handleContent = (n?: HTMLDivElement | null) => {
    this.content = n || void 0;
  };

  handleNode = (n?: HTMLSpanElement | null) => {
    this.node = n || void 0;
  };

  handleShadow = (n?: HTMLDivElement | null) => {
    this.shadow = n || void 0;
  };

  handleShadowChildren = (n?: HTMLDivElement | null) => {
    this.shadowChildren = n || void 0;
  };

  render() {
    const { text, targetCount } = this.state;
    const {
      lines,
      length,
      tooltip,
      fullWidthRecognition,
      className,
      children,
      ...restProps
    } = this.props;

    const cx = classNames(styles.ellipsis, className, {
      [styles.lines]: lines && !isSupportLineClamp,
      [styles.lineClamp]: lines && isSupportLineClamp,
    });

    if (!lines && !length)
      return (
        <span className={cx} {...restProps}>
          {children}
        </span>
      );

    // length
    if (!lines) {
      if (typeof children !== 'string') {
        throw new Error('Ellipsis children must be string.');
      }
      return (
        <EllipsisText
          className={cx}
          length={length as number}
          text={children || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
          {...restProps}
        />
      );
    }

    const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;

    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const style = `#${id}{-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`;
      return (
        <GetTooltip tooltip={tooltip} overlayStyle={tooltipOverlayStyle} title={children}>
          <div id={id} className={cx} {...restProps}>
            <style>{style}</style>
            {children}
          </div>
        </GetTooltip>
      );
    }

    return (
      <div {...restProps} ref={this.handleRoot} className={cx}>
        <div ref={this.handleContent}>
          <GetTooltip tooltip={tooltip} overlayStyle={tooltipOverlayStyle} title={text}>
            <span ref={this.handleNode}>
              {targetCount > 0 && text.substring(0, targetCount)}
              {targetCount > 0 && targetCount < text.length && '...'}
            </span>
          </GetTooltip>
          <div className={styles.shadow} ref={this.handleShadowChildren}>
            {children}
          </div>
          <div className={styles.shadow} ref={this.handleShadow}>
            <span>{text}</span>
          </div>
        </div>
      </div>
    );
  }
}
