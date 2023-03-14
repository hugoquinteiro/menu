export default {
    validaDados(tabela, objInfo){
        this.mensagens = []
        let result = false
        switch(tabela) {
            case "grupo": 
                Object.values(objInfo).forEach((v) => {
                    result = v.length===0 ? false : true })
            case "produto":
                Object.values(objInfo).forEach((v) => {
                    result = v.length===0 ? false : true })
        }
        return result
    }
}