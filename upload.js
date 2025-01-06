import client from 'scp2';
import ora from 'ora';
import chalk from 'chalk';
const spinner = ora(chalk.green('测试环境:正在发布到服务器中...'));

spinner.start();

client.scp(
  './v3_shop/', // 打包产生的文件
  {
    host: '172.0.0.1', // 服务器地址
    port: 8080, // 服务器端口
    username: 'root', // 服务器账号
    password: '123456', // 服务器密码
    path: '../../../OrbStack/docker/containers/nginx-test/home/v3_shop/' // nginx镜像中的地址
  },
  (err) => {
    spinner.stop();
    if (err) {
      console.log(chalk.red('发布失败'), err);
    } else {
      console.log(chalk.green('发布成功'));
    }
  }
);
