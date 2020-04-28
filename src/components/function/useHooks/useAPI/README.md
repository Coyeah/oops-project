# useAPI: hooks 请求组件

## Description

React.FC 内管理网络请求的 hooks 组件。支持对请求的立即执行/手动触发执行、请求中止、轮询。传参类似 `api 函数`。

使用：`const target = useAPI(options)`

### 传参

+ request：自定义封装的请求函数。
+ url：请求地址。
+ data：传参/默认传参。
+ manual：是否为手动触发执行请求。
+ pollingInterval：轮询的时间间隔，开启**轮询模式**模式，对应的操作为 `timer` 对象中的函数方法。
+ onSuccess：请求成功后回调函数。
+ onError：请求失败后后调函数。
+ suspense: 支持React.Suspense

对象中可以包含 RequestInit[ts] 中的请求参数。

### 返回

+ loading：是否正在请求。
+ error：请求异常/请求中止、暂停时抛出的 Error
+ data：请求成功后的响应内容。
+ cancel：请求中止函数。
+ run：手动执行请求函数。
+ timer：轮询对象，内置 `stop`、`pause`、`resume`，对应轮询请求的中止、暂停、重启功能。

## Demo

```javascript
const Report: React.FC = () => {
  const {
    data,
    run,
    loading
  } = useAPI({
    url: '/api/ac/saas/address/areaList',
    data: {
      areaCode: "", levelType: 0
    }
  }, {
    // manual: true,      // 是否为手动触发执行请求。
    // pollingInterval: 2000,   // 轮询的时间间隔，开启**轮询模式**模式。
    onSuccess: (data) => {
      console.log('onSuccess: ', data);
    },
    onError: (error) => {
      console.log('onError: ', error);
    }
  });

  const handleClick = () => {
    run({
      areaCode: "410000", levelType: 1
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <div>Hello World!</div>
      <Button onClick={handleClick}>请求</Button>
      {!loading && (
        <div><b>data({Date.now()}): </b>{JSON.stringify(data)}</div>
      )}
    </div>
  )
};
```
