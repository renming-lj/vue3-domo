/*
 * @Description: 
 * @Author: yanxiao
 * @Github: https://github.com/yanxiaos
 * @Date: 2022-03-29 15:26:18
 * @LastEditors: yanxiao
 */
// 将两个类型混合取交叉类型
export type Mixin<T, K> = {
    [P in keyof (T & K)]: (T & K)[P]
};
