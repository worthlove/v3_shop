// 美化打印实现方法
const prettyLog = () => {
  // 判断当前环境是否为生产环境
  const isProduction = process.env.NODE_ENV === 'production';
  
  // 判断值是否为空 value: any
  const isEmpty = (value: any): boolean => {
    return value == null || false || value === '';
  };
  
  // 格式化打印函数         title: string, text: string, color: string
  const prettyPrint = (title: string, text: string, color: string) => {
    // 在生产环境下不执行打印操作
    if (isProduction) return;
    // 使用 console.log 输出格式化的字符串
    console.log(
        `%c ${title} %c ${text} %c`,
        `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
        `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
        'background:transparent'
    );
  };
  
  // 打印信息            extOrTitle：String, content = ""
  const info = (textOrTitle: string, content: string = '') => {
    // 如果 content 为空，则 title 默认为 "Info"
    const title = isEmpty(content)? 'Info' : textOrTitle;
    // 如果 content 为空，则 text 默认为 textOrTitle
    const text = isEmpty(content)? textOrTitle : content;
    // 调用 prettyPrint 函数打印信息
    prettyPrint(title, text, '#909399');
  };
  
  // 打印错误  textOrTitle: string, content = ""
  const error = (textOrTitle: string, content: string = '') => {
    // 如果 content 为空，则 title 默认为 "Error"
    const title = isEmpty(content)? 'Error' : textOrTitle;
    // 如果 content 为空，则 text 默认为 textOrTitle
    const text = isEmpty(content)? textOrTitle : content;
    // 调用 prettyPrint 函数打印错误
    prettyPrint(title, text, '#F56C6C');
  };
  
  // 打印警告  textOrTitle：string, content = ""
  const warning = (textOrTitle: string, content: string = '') => {
    // 如果 content 为空，则 title 默认为 "Warning"
    const title = isEmpty(content)? 'Warning' : textOrTitle;
    // 如果 content 为空，则 text 默认为 textOrTitle
    const text = isEmpty(content)? textOrTitle : content;
    // 调用 prettyPrint 函数打印警告
    prettyPrint(title, text, '#E6A23C');
  };
  
  // 打印成功 textOrTitle：string, content = ""
  const success = (textOrTitle: string, content: string = '') => {
    // 如果 content 为空，则 title 默认为 "Success"
    const title = isEmpty(content)? 'Success ' : textOrTitle;
    // 如果 content 为空，则 text 默认为 textOrTitle
    const text = isEmpty(content)? textOrTitle : content;
    // 调用 prettyPrint 函数打印成功
    prettyPrint(title, text, '#67C23A');
  };
  
  // 打印表格
  const table = () => {
    const data = [
      {
        id: 1,
        name: 'Alice',
        age: 25
      },
      {
        id: 2,
        name: 'Bob',
        age: 30
      },
      {
        id: 3,
        name: 'Charlie',
        age: 35
      }
    ];
    // 打印表格标题
    console.log(
        '%c id%c name%c age',
        'color: white; background-color: black; padding: 2px 10px;',
        'color: white; background-color: black; padding: 2px 10px;',
        'color: white; background-color: black; padding: 2px 10px;'
    );
    
    // 遍历数据并打印表格行  row: any
    data.forEach((row: { id: number; name: string; age: number }) => {
      console.log(
          `%c ${row.id} %c ${row.name} %c ${row.age} `,
          'color: black; background-color: lightgray; padding: 2px 10px;',
          'color: black; background-color: lightgray; padding: 2px 10px;',
          'color: black; background-color: lightgray; padding: 2px 10px;'
      );
    });
  };
  
  // 打印图片  url: string, scale = 1
  const picture = (url: string, scale: number = 1) => {
    // 在生产环境下不执行打印操作
    if (isProduction) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (ctx) {
        c.width = img.width;
        c.height = img.height;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = c.toDataURL('image/png');
        
        console.log(
            '%c sup?',
            `font-size: 1px;
                    padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                    background-image: url(${dataUri});
                    background-repeat: no-repeat;
                    background-size: ${img.width * scale}px ${img.height * scale}px;
                    color: transparent;
                    `
        );
      }
    };
    img.src = url
  };

// 返回包含各种打印方法的对象
  return {
    info,
    error,
    warning,
    success,
    picture,
    table
  }
}

// 导出 prettyLog 函数
module.exports = prettyLog
