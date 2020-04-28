import React from 'react';
import Center from '@/components/layout/Center';
import { RouterType } from '@/layouts/RouterLayout';
import { Link } from 'react-router-dom';

export default function (props: RouterType) {
  const { router } = props;
  return (
    <>
      <h1>这是一个测试页面。—————————— {router.name}页面</h1>
      <div>
        跳转一个没有权限的页面 > <Link to="/test/3">辣椒</Link>
      </div>
    </>
  );
}
