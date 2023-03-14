import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './components/Inicio'
import Inicio2 from './components/Inicio2'
import Controle from './components/Controle'
import Controle2 from './components/Controle2'
import Teste from './components/Teste'
import Login from './components/Login'
// import Listar from './components/ListarDados'

Vue.use(Router)

export default new Router({
    routes:[
        { path: '/', component: Inicio }
        ,{ path: '/controle', component: Controle }
        ,{ path: '/teste', component: Teste }
        ,{ path: '/admin', component: Controle2 }
        ,{ path: '/Login', component: Login }
        ,{ path: '/inicio2', component: Inicio2 }
]
})