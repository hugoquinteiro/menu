import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './components/Inicio'
import Controle from './components/Controle'
import Teste from './components/Teste'
// import Listar from './components/ListarDados'

Vue.use(Router)

export default new Router({
    routes:[
        { path: '/', component: Inicio }
        ,{ path: '/controle', component: Controle }
        ,{ path: '/teste', component: Teste }
        // ,{ path: '/listar', component: Listar }

]
})