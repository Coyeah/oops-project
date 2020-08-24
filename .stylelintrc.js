module.exports = {
  processors: [],
  plugins: ['stylelint-prettier'],
  extends: 'stylelint-config-standard', // 这是官方推荐的方式
  rules: {
    // ====== 通用配置 ====== \\

    // "indentation": 2,
    // 上下间隔行数:
    'max-empty-lines': 2,
    // 每行最大字符数:
    'max-line-length': 100,
    // 嵌套的深度:
    'max-nesting-depth': 4,
    // 禁止 css hack
    'no-browser-hacks': true,
    // 权重覆盖从大到小
    'no-descending-specificity': true,
    // 不允许重复 css类名
    'no-duplicate-selectors': true,
    // 不允许空来源
    'no-empty-source': true,
    // 不允许尾部的空白
    // "no-eol-whitespace": true,
    // 不允许额外的分号
    'no-extra-semicolons': true,
    // 禁止那些可疑接近于相同的颜色
    'no-indistinguishable-colors': true,
    // 不允许双斜线注释（//...并非由CSS支持)
    'no-invalid-double-slash-comments': true,
    // 不允许文档结束处缺少换行符
    // "no-missing-end-of-source-newline": true,
    // 禁止不符合一个动画的名称@keyframes声明
    'no-unknown-animations': true,
    // 禁止由您的目标浏览器不支持的功能
    // "no-unsupported-browser-features": true,

    // ====== 颜色配置 ====== \\

    // 指定十六进制颜色大小写 string: "lower"|"upper"
    'color-hex-case': 'lower',
    // 指定十六进制颜色或长或短的符号 string: "short"|"long"
    'color-hex-length': 'short',
    // 不允许命名的颜色 string: "always-where-possible"|"never"
    'color-named': 'never',
    // 不允许无效的十六进制颜色
    'color-no-invalid-hex': true,
    // 要求数字或命名 font-weight值
    'font-weight-notation': 'numeric',
    // ====== 数字配置 ====== \\

    // 小数点前不加0
    'number-leading-zero': 'never',
    // 最多保留小数点后三位
    'number-max-precision': 3,
    // 当小数点后为0时可以省略
    'number-no-trailing-zeros': true,
    // ====== 字符配置 ====== \\

    // 禁止在字符串（转义）换行
    'string-no-newline': true,
    // ====== 数值配置 ====== \\

    // 值为0时 可以省略单位
    'length-zero-no-unit': true,
    // ====== 单位配置 ====== \\
    // 单位为小写
    'unit-case': 'lower',
    // 禁止未知单位
    'unit-no-unknown': true,
    // ====== 属性值配置 ====== \\

    // 需要一个新行或值列表的逗号后禁止空白 : 分号不能折行
    'value-list-comma-newline-after': 'always-multi-line',
    // 需要一个新行或值列表的逗号之前不允许空白
    'value-list-comma-newline-before': 'never-multi-line',
    // 需要一个空间或值列表的逗号后 : 需要有一个空格
    'value-list-comma-space-after': 'always-single-line',
    // 需要一个空间或值列表的逗号之前 : 不允许有空格
    'value-list-comma-space-before': 'never',
    // 值为小写
    'value-keyword-case': 'lower',
    // 限制值列表中的相邻的空行数 :
    'value-list-max-empty-lines': 0,
    // 不允许浏览器前缀值
    'value-no-vendor-prefix': true,
    // 在简写属性不允许重复值
    'shorthand-property-no-redundant-values': true,
    // ====== 属性配置 ====== \\

    // 指定属性的大写或小写
    'property-case': 'lower',
    // 禁止未知属性
    'property-no-unknown': true,
    // 不允许添加浏览器前缀
    'property-no-vendor-prefix': true,
    // 不允许!important keyframes 声明中
    'keyframe-declaration-no-important': true,
    // ====== 属性配置 ====== \\

    // 格式显示
    // !important “!”之后不需要空格
    'declaration-bang-space-after': 'never',
    // !important 之前需要一个空格
    'declaration-bang-space-before': 'always',
    // 冒号或逗号后不允许空白和换行符
    'declaration-colon-newline-after': 'always-multi-line',
    // 冒号后需要一个空白
    'declaration-colon-space-after': 'always-single-line',
    // 冒号前需要一个空白
    'declaration-colon-space-before': 'never',
    // 属性声明前禁止一个空行。
    'declaration-empty-line-before': 'never',
    // 不允许!important声明中
    // "declaration-no-important": true,

    // ====== 声明块配置 ====== \\

    // 不允许声明块中重复的属性
    'declaration-block-no-duplicate-properties': true,
    // 禁止那些由于在同一规则的另一个属性值忽略的属性值。
    'declaration-block-no-ignored-properties': true,
    // 合并相同属性的值
    'declaration-block-no-redundant-longhand-properties': true,
    // 禁止该优先于相关声明块中手写速记的属性的属性
    'declaration-block-no-shorthand-property-overrides': true,
    // 指定声明块中属性的顺序。
    // "declaration-block-properties-order": "alphabetical",
    // 需要一个换行符或声明块的分号后不允许空白
    'declaration-block-semicolon-newline-after': 'always',
    // 声明块的分号之前不允许空白
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    // 分号后不允许有空格 单行就无所谓了
    'declaration-block-semicolon-space-after': 'never-single-line',
    // 分号前不允许有空格
    'declaration-block-semicolon-space-before': 'never',
    // 限制单行声明块内声明的数量
    // "declaration-block-single-line-max-declarations": 1,
    // 最后一个声明必须有分号 always || never
    'declaration-block-trailing-semicolon': 'always',
    // 声明块里不允许有空行
    'block-closing-brace-empty-line-before': 'never',
    // 右括号之后必须有一个换行符
    'block-closing-brace-newline-after': 'always',
    // 右括号之前必须有一个换行符
    'block-closing-brace-newline-before': 'always',
    // 右括号后的一个空格
    // "block-closing-brace-space-after": "never-multi-line",
    // "block-closing-brace-space-before": "never-multi-line",
    // 不允许空块。
    'block-no-empty': true,
    // 不允许单行块。
    'block-no-single-line': true,
    // 多行块开括号后换行
    'block-opening-brace-newline-after': 'always-multi-line',
    // 需要一个新行或块的开括号之前不允许空白
    // "block-opening-brace-newline-before": "never-multi-line",
    // 需要一个空间或块的开括号后不允许空白。
    // "block-opening-brace-space-after": "never-multi-line",
    // 需要一个空间或块的开括号后不允许空白
    // "block-opening-brace-space-after": "always-multi-line",
    // 需要一个空间或块的开括号之前不允许空白
    'block-opening-brace-space-before': 'always',
    // ======= 选择符配置 ======= \\
    // 属性选择中括号内 : 有必须始终是括号内一个空格
    'selector-attribute-brackets-space-inside': 'never',
    // 属性选择器 = 后不允许空白
    'selector-attribute-operator-space-after': 'never',
    // 属性选择器 = 前不允许空白
    'selector-attribute-operator-space-before': 'never',
    // 要求或禁止的属性值引号
    'selector-attribute-quotes': 'always',
    // 组合选择器之后不允许空白
    'selector-combinator-space-after': 'never',
    // 组合选择器之前不允许空白
    'selector-combinator-space-before': 'never',
    // 组合选择器之间只允许一个空格
    'selector-descendant-combinator-no-non-space': true,
    // 组合选择器层级
    'selector-max-compound-selectors': 4,
    // 不允许空选择器
    'selector-no-empty': true,
    // 不允许通用选择符
    'selector-no-universal': true,
    // 禁止浏览器选择器的前缀
    'selector-no-vendor-prefix': true,
    // 指定大写或小写伪类选择
    'selector-pseudo-class-case': 'lower',
    // 不允许未知伪类选择
    'selector-pseudo-class-no-unknown': true,
    // 伪类选择中括号内不允许空白
    'selector-pseudo-class-parentheses-space-inside': 'never',
    // 指定大写或小写伪元素
    'selector-pseudo-element-case': 'lower',
    // 指定适用的伪元素单冒号表示
    'selector-pseudo-element-colon-notation': 'single',
    // 不允许未知伪元素选择
    'selector-pseudo-element-no-unknown': true,
    // 指定大写或小写的类型选择
    'selector-type-case': 'lower',
    // 禁止未知类型选择器
    'selector-type-no-unknown': true,
    // 限制选择器内的相邻的空行数
    'selector-max-empty-lines': 0,
    // 选择列表的逗号后 : 有必须始终是逗号之前有一个换行符
    'selector-list-comma-newline-after': 'always',
    // 选择列表的逗号前 : 有必须始终是逗号之前有一个换行符
    'selector-list-comma-newline-before': 'never-multi-line',
    // 选择列表中的逗号后禁止空白 : 在单行选择列表中的逗号后面有一个空格
    'selector-list-comma-space-after': 'always-single-line',
    // 选择列表中的逗号前禁止空白 : 在单行选择列表中的逗号后面有一个空格
    'selector-list-comma-space-before': 'never',
    // 禁止内部标准属性:root规则
    'root-no-standard-properties': true,
    // ======== 规则 ======== \\
    // 规则嵌套空行前 : 有必须始终是之前多行规则的一个空行
    'rule-nested-empty-line-before': 'never-multi-line',
    // 要求或禁止前非嵌套规则，有必须始终是规则之前，一个空行
    'rule-non-nested-empty-line-before': 'always',
    // ======= 媒体查询配置 ======= \\

    // 媒体查询的条件选择器冒号后 必须有一个空格
    'media-feature-colon-space-after': 'always',
    // 媒体查询的条件选择器冒号前 不能有空格
    'media-feature-colon-space-before': 'never',
    // 媒体查询的条件选择器 小写
    'media-feature-name-case': 'lower',
    // 禁止未知的媒体功能名称
    'media-feature-name-no-unknown': true,
    // 禁止对媒体的功能名称浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    // 禁止对非布尔媒体功能缺失的标点符号
    'media-feature-no-missing-punctuation': true,
    // 媒体功能的括号内不允许空白
    'media-feature-parentheses-space-inside': 'never',
    // 媒体功能范围运算符后不允许空白
    'media-feature-range-operator-space-after': 'never',
    // 媒体功能的范围内运营商之前不允许空白
    'media-feature-range-operator-space-before': 'never',
    // 媒体查询列表中的逗号后 : 多行媒体查询列表中的逗号后换行
    'media-query-list-comma-newline-after': 'always-multi-line',
    // 媒体查询列表中的逗号前 : 不允许多行媒体查询列表中的逗号之前的空白
    'media-query-list-comma-newline-before': 'never-multi-line',
    // 媒体查询列表中的逗号后禁止空白
    'media-query-list-comma-space-after': 'never',
    // 媒体查询列表中的逗号之前不允许空白
    'media-query-list-comma-space-before': 'never',
    // ======= 规则配置 ======= \\

    // 需要或规则之前禁止一个空行
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'all-nested',
          'blockless-after-same-name-blockless',
          'first-nested',
        ],
        ignore: ['after-comment'],
      },
    ],
    // 指定大写或小写在规则的名称 : 小写
    'at-rule-name-case': 'lower',
    // 规则的名称后，一个换行符 : 多行线在规则块在规则名称后面一个换行符
    'at-rule-name-newline-after': 'always-multi-line',
    // 要求在规则名称后面有一个空格 : 单行声明块在规则名称后面 必须有一个空格
    'at-rule-name-space-after': 'always-single-line',
    // 禁止在规则不明
    'at-rule-no-unknown': true,
    // 不允许供应商前缀在规则
    'at-rule-no-vendor-prefix': true,
    // 在规则分号之后需要一个换行符 : 在规则分号之后 必须有一个换行符
    'at-rule-semicolon-newline-after': 'always',
    // 之前或之后需要一个理由评论stylelint-disable意见
    'stylelint-disable-reason': 'always-before',
    // 注释之前禁止一个空行
    'comment-empty-line-before': 'never',
    // 不允许空评论
    'comment-no-empty': true,
    // 注释标记内不允许空白
    'comment-whitespace-inside': 'always',
  },
};
