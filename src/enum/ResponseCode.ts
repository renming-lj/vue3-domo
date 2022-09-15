/*
 * @Description: 网络请求响应码
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/5/5 11:45
 * @LastEditors: yanxiaos
 * @Path: src/enum/ResponseCode.ts
 */
export enum ResponseCode {
    /**
     * 成功
     */
    SUCCESS = "00000",
    /**
     * 失败
     */
    FAILURE = "99999",
    /**
     * 验证码发送失败
     */
    VERIFICATION_CODE_SEND_FAILED = "10000",
    /**
     * 验证码错误
     */
    VERIFICATION_CODE_ERROR = "10100",
    /**
     * 验证码失效
     */
    VERIFICATION_CODE_INVALID = "10200",
    /**
     * 请求类型错误
     */
    REQUEST_TYPE_ERROR = "11100",
    /**
     * 不支持该请求类型
     */
    REQUEST_TYPE_DENIED = "11200",
    /**
     * 文件上传失败
     */
    FILE_UPLOAD_FAILED = "12000",
    /**
     * 注册登录错误
     */
    REGISTER_OR_LOGIN_ERROR = "20000",
    /**
     * 账号或密码不能为空
     */
    USERNAME_OR_PASSWORD_NOT_BE_EMPTY = "20100",
    /**
     * 认证code不能为空
     */
    AUTH_CODE_NOT_BE_EMPTY = "20200",
    /**
     * 认证code已失效
     */
    AUTH_CODE_INVALID = "20300",
    /**
     * 注册失败
     */
    REGISTER_FAILED = "21000",
    /**
     * 账号已存在
     */
    ACCOUNT_ALREADY_EXISTS = "21100",
    /**
     * 登陆失败
     */
    LOGIN_FAILED = "22000",
    /**
     * 账号或密码错误
     */
    USERNAME_OR_PASSWORD_ERROR = "22100",
    /**
     * 账号已被锁定
     */
    ACCOUNT_IS_LOCKED = "22200",
    /**
     * 账号未激活
     */
    ACCOUNT_NOT_ACTIVATED = "22300",
    /**
     * 需要绑定手机号
     */
    NEED_BINDING_PHONE_NUMBER = "22400",
    /**
     * 账号不存在
     */
    ACCOUNT_NOT_EXISTS = "22500",
    /**
     * 未登录
     */
    NOT_LOGGED_IN = "23000",
    /**
     * 无token
     */
    TOKEN_IS_MISSING = "23100",
    /**
     * token无效
     */
    TOKEN_INVALID = "23200",
    /**
     * token已过期
     */
    TOKEN_EXPIRED = "23300",
    /**
     * token被踢下线
     */
    TOKEN_REMOVED = "23400",
    /**
     * token被顶下线
     */
    TOKEN_REPLACED = "23500",
    /**
     * 数据错误
     */
    DATA_ERROR = "30000",
    /**
     * 数据已存在
     */
    DATA_ALREADY_EXISTS = "30100",
    /**
     * 数据不存在
     */
    DATA_NOT_EXISTS = "30200",
    /**
     * 新增错误
     */
    ADD_FAILED = "31000",
    /**
     * 删除错误
     */
    DELETE_FAILED = "32000",
    /**
     * 修改错误
     */
    UPDATE_FAILED = "33000",
    /**
     * 查询错误
     */
    QUERY_FAILED = "34000",
    /**
     * 格式错误
     */
    PARAM_FORMAT_ERROR = "35000",
    /**
     * 类型错误
     */
    PARAM_TYPE_ERROR = "36000",
    /**
     * 参数不能为空
     */
    PARAM_NOT_BE_EMPTY = "37000",
    /**
     * 参数范围错误
     */
    PARAM_OUT_OF_RANGE = "38000",
    /**
     * 参数校验错误
     */
    PARAM_CHECK_EXCEPTION = "39000",
    /**
     * 没有权限
     */
    PERMISSION_DENIED = "40000",
    /**
     * 服务器错误
     */
    EXCEPTION = "50000",
    /**
     * 临时停服
     */
    TEMPORARILY_STOP_SERVICE = "50100",
    /**
     * 服务升级中
     */
    SERVICE_UPDATING = "50200",
}