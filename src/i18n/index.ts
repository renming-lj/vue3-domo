/*
 * @Description:
 * @Author: yanxiao
 * @Github: https://github.com/yanxiaos
 * @Date: 2022-04-09 10:51:42
 * @LastEditors: yanxiao
 */
import { createI18n } from "vue3-i18n";
import zhHome from "./zh/home";
import enHome from "./en/home";


const messages = {
    en: {
        ...enHome
    },
    zh: {
        ...zhHome
    }
}

const i18n = createI18n({
    locale: "zh",
    messages: messages,
});

export default i18n;