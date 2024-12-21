/**
 * @description: 表格列配置项
 * @param {string} type 列类型
 * @param {string} label 列标题
 * @param {boolean} fixed 列是否固定
 * @param {string | number} width 列宽度
 * @param {any} render 自定义列内容渲染（tsx语法）
 * @param {string} selection 列选择器类型
 * @param {string} align 列对齐方式
 * @param {string} prop 列对应数据字段
 * @param {boolean} showOverflowTooltip 列超出宽度是否显示 tooltip
 * @param {boolean} sortable 列是否可排序
 * @param {string | ((row: any) => string)} class 列类名
 * @param {Function} click 行点击事件
 * @param {Function} transfer 行数据转换
 * @param {boolean} headerRender 表头是否渲染
 * @param {any} headerStyle 表头样式
 * @return {*}
 */
export interface LabelItem {
  type?: string;
  label?: string;
  fixed?: boolean | string;
  width?: string | number;
  render?: any; // 可以是具体的组件类型或函数
  selection?: string;
  align?: string;
  prop?: string;
  showOverflowTooltip?: boolean;
  sortable?: boolean;
  class?: string | ((row: any) => string);
  click?: (row: any) => void;
  transfer?: (row: any) => any;
  headerRender?: boolean;
  headerStyle?: any;
}

