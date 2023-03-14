import Vue from 'vue'
export default new Vue({
    methods: {
        validaDados(tabela, objInfo) {
            this.mensagens = []
            let result = true
            //console.log('objInfo', objInfo)
            Object.values(objInfo).forEach((v) => {
                //console.log('lenght',v)
                if (v.length === 0 || v == 0 || v === null) {
                    result = false
                    //console.log('bus', v.length, v)
                }
            })
            return result
        },
    }
})