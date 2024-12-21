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

