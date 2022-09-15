/*
 * @Description: 合并 import.meta.globEager 导入的文件，返回一个对象
 * @Author: yanxiao
 * @Github: https://github.com/yanxiaos
 * @Date: 2022-04-09 11:43:41
 * @LastEditors: yanxiao
 */
export default function globEagerMerge(
    modules: Record<string, Record<string, any>>,
    option: Array<string> = ['export', 'default']
): Record<string, any> {
    let result: Record<string, any> = {}
    for (const fileName in modules) {
        const module = modules[fileName]
        for (const key in module) {
            if (key === 'default' && option.includes('default')) {
                for (const defKey in module['default']) {
                    if (result[defKey]) console.warn(`[globEagerMerge] ${fileName} ${defKey} 重复`);
                    result[defKey] = module['default'][defKey]
                }
            } else if (option.includes('export')) {
                if (result[key]) console.warn(`[globEagerMerge] ${fileName} ${key} 重复`);
                result[key] = module[key]
            }
        }
    }

    return result
}

