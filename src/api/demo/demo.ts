/*
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/15 17:03
 * @LastEditors: yanxiaos
 * @Path: src/api/demo/demo.ts
 */
import http from "@/utils/http";
import {DemoReq, DemoRes} from "@/api/demo/model";

const prefix = ""

//查询优惠规则
export function getListRuleApi (param:DemoReq) {
  return http.request<DemoRes>({
    url: prefix + "/PreferentialRule/getList",
    method: "post",
    data: param,
  });
}
