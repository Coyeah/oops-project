import React from 'react';
import Icon from '@/components/function/Icon';
import logo from '@/assets/layouts/logo.png';
import Center from '@/components/layout/Center';
import styles from './index.less';

export default function () {
  return (
    <Center justifyContent="flex-start">
      <Icon src={logo} size={100} />
      <div className={styles.layout}>
        <div>
          感谢使用
          oops-project。这是一个自建的前端脚手架，图好玩和练习搭建起来的，在使用过程中慢慢迭代和更新。
        </div>
        <div>
          👏希望 star 给予支持！
          <a href={INITIAL_SITE_INFO.repo} target="_blank">
            {INITIAL_SITE_INFO.repo}
          </a>
        </div>
      </div>
    </Center>
  );
}
