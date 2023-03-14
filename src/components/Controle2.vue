<template><!-- 
        Data: 20/02/2023
        Neste componente vou tentar implementar, tanto a lista como o formulario todo em componentes
    
    -->
        <div class="controle">
            <b-container>
                <div>
                    <h1>Administrador de Dados</h1>
                    <div class="row">
                        <!-- Grupos                 -->
                        <!-- <b-card title="Grupos" img-src="../assets/grupo2.jpg" img-alt="Image" img-top tag="article"
                            style="max-width: 20rem;" class="mb-2">
                            <b-card-text>
                                Manutenção no cadastro de Grupos
                            </b-card-text>
                            <div class="row">
                                <b-button v-b-modal.modal-grupo class="ml-3">Administrar</b-button>
                            </div>
                        </b-card> -->
                        <!-- Produtos    -->
                        <!-- <b-card title="Produtos" img-src="../assets/produtos.jpg" img-alt="Image" img-top tag="article"
                            style="max-width: 20rem;" class="ml-4">
                            <b-card-text>
                                Manutenção no cadastro de Produtos
                            </b-card-text>
                            <div class="row">
                                <b-button @click="editarProduto" class="ml-4">Administrar</b-button>
                            </div>
                        </b-card> -->
                        <!-- Menu    -->
                        <b-card title="Menu" img-src="../assets/menu.jpg" img-alt="Image" img-top tag="article"
                            style="max-width: 20rem;" class="ml-4">
                            <b-card-text>
                                Ver Menu
                            </b-card-text>
                            <div class="row">
                                <b-button href="#" variant="primary" class="ml-3" @click="listar('produto')">Listar</b-button>
                            </div>
                        </b-card>

                    </div>
                </div>


                <keep-alive>
                    <Grupo />
                </keep-alive>

                <keep-alive>
                    <Produto />
                </keep-alive>


                <!-- <Listar v-show="tabela" :dados="dadosTable"/> -->
                <Inicio v-show="tabela" :dados="dadosTable" @editarProduto="editarProduto($event)"
                    @editarGrupo="editarGrupo($event)" />
            </b-container>

        </div>
</template>

<script>
// import Listar from './ListarDados'
import Inicio from './Inicio'
import Grupo from './Formulario'
import Produto from './FormProduto'
import { Money } from 'v-money'
import bus from './barramento'

export default {
    components: { Money, Inicio, Grupo, Produto },
    data() {
        return {
            produtos: [],
            produto: {
                produto: '',
                valor1: 0,
                grupo: ''

            },
            grupos: [],
            grupo: {},
            mensagens: [],
            money: {
                decimal: ',',
                thousands: '.',
                precision: 2,
                masked: false
            },
            tabela: false
            , dadosTable: 'produtos'
            , modalGrupo: false
            , dados: {}
            , editaGrupo: false
        }
    },
    computed: {
    },
    filters: {
    },
    methods: {

        editarProduto() {
            let produtoVazio = { produto: '', valor1: 0, grupo: '' }
            bus.$emit('editarProduto', produtoVazio)
        },
        editarGrupo(valor) {
            //console.log('Editar Grupo:',valor)
            this.grupo = valor[0]
            //console.log('Editar Grupo:',this.dados)
        },

        listar(tab) {
            this.dadosTable = 'produtos'
            if (tab == 'produto') {
                this.tabela = true
            }

            if (tab == 'grupo') {
                this.tabela = true
            }
        }
    },
    mounted() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#valor {
    text-align: end;
}
</style>
