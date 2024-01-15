const sourceJsonKey = 'MixIot:source'
const APP = 'mixapplication';

export default {
    getSourceJsonKey(){
        return sourceJsonKey;
    },
    getAppName(){
        return APP;
    },
    /**
     *
     * @param path  当前路由path属性
     * @param source
     */
    setSource(path, source) {
        let sourceJson = localStorage.getItem(sourceJsonKey)
        if (sourceJson) {
            sourceJson = JSON.parse(sourceJson)
        } else {
            sourceJson = {}
        }
        let sourceKey = this.sourceKey(path)
        sourceJson[sourceKey] = source
        localStorage.setItem(sourceJsonKey, JSON.stringify(sourceJson));
    },
    /**
     *
     * @param path 当前路由path属性
     * @returns {string}
     */
    getSource(path) {
        let sourceJson = localStorage.getItem(sourceJsonKey)
        if (sourceJson) {
            sourceJson = JSON.parse(sourceJson)
        } else {
            sourceJson = {}
        }
        return sourceJson[this.sourceKey(path)];
    },
    sourceKey(path) {
        let pathArr = path.split('/');
        let block = pathArr[0] || pathArr[1];
        return APP + ':' + block;
    }
}
