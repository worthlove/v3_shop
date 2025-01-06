import client from 'scp2';
import ora from 'ora';
import chalk from 'chalk';
const spinner = ora(chalk.green('测试环境:正在发布到服务器中...'));

spinner.start();

client.scp(
  './v3_shop/',
  {
    host: '172.0.0.1',
    port: 8080,
    username: 'root', // 服务器账号
    password: '123456', // 服务器密码
    path: '../../../OrbStack/docker/containers/nginx-test/home/v3_shop/'
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
