import type {App} from "vue";
import i18n from "./i18n/index";

export default {
    install(app:App){
        app.use(i18n)
    }
}