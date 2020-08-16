# 登录接口和注册接口的设计

## 登录接口
登录成功后，返回一个token，将token 存到vuex 和 cookie 里面，然后获取通过token获取用户角色