<template>
    <b-container>
        <b-alert dismissible v-for="mensagem in mensagens" 
            :key="mensagem.texto" 
            :show="mensagem.tempo"
            :variant="mensagem.tipo"
            @dismissed="mensagem.tempo=0"
        >
            {{ mensagem.texto }}
        </b-alert>

        <b-button variant="primary" @click="editarGrupo(1)">Cadastrar Grupo</b-button>

        <b-button variant="warning" class="ml-5" @click="listar('ALL')"><i class="fa fa-angle-down"></i></b-button>
        <b-button variant="warning" class="ml-1" @click="listar(null)"><i class="fa fa-angle-up"></i></b-button>


        <div class="mt-2" v-for="(info, key) in grupos">
            <b-row>
                <template v-if="edita">
                    <b-button class="d-flex ml-md-auto" @click="editarProduto({ novo: true, grupo: key })" variant="success"><i
                            class="fa fa-plus-square"></i>
                    </b-button>
                </template>
                <b-col>
                    <b-button block :variant="info.cor" @click="listar(key)">
                        {{ info.grupo }}
                    </b-button>
                </b-col>
                <template v-if="edita">
                    <b-button class="d-flex ml-md-auto" @click="editarGrupo(key)" variant="warning"><i
                            class="fa fa-pencil"></i></b-button>
                </template>
            </b-row>
            <div>
                <!-- <b-table hover striped :items="lista" :fields="fields" v-show="info.open">
                    <template v-slot:cell(actions)="data">
                        <b-button variant="warning" class="mr-2" @click="editarProduto(data.item.id)">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                    </template>
                </b-table> -->
                <div v-for="(produto, prodKey) in produtos" v-if="produto.grupo === key">
                    <div  v-show="mostrarProduto===key || mostrarProduto==='ALL'">
                        <b-row class="mt-2 ml-5">
                            <b-col cols="2">
                                <b-button v-if="edita" variant="warning" class="mr-2" @click="editarProduto({ novo: false, id: prodKey })">
                                    <i class="fa fa-pencil"></i>
                                </b-button>
                            </b-col>
                            <b-col cols="6">
                                <p >{{ produto.produto }}</p>
                            </b-col>
                            <b-col cols="2">
                                <p >{{ produto.valor1 }}</p>
                            </b-col>
                            <b-col>
                                <b-img :src="produto.url==='X' ? null : produto.url" thumbnail fluid rounded ></b-img>
                            </b-col>
                        </b-row><hr>
                    </div>
                </div>

            </div>
        </div>

        <hr>

        <keep-alive>
            <cadGrupo />
        </keep-alive>
        <keep-alive>
            <cadProduto />
        </keep-alive>
    </b-container>
</template>

<script>
import cadGrupo from './FormGrupo'
import cadProduto from './FormProduto'

export default {
    components: { cadGrupo, cadProduto },
    data() {
        return {
            //localGrupos:[],
            fields: [
                { key: 'produto', label: 'Produto', sortable: true, },
                { key: 'valor1', label: 'Preço', sortable: true, },
                { key: 'actions', label: '#', sortable: true, },
            ],
            //lista: [],
            edita: false,
            mostrarProduto: ''
        }
    },
    computed: {
        grupos() {
            //return this.$store.getters.getGrupos
            return this.$store.state.grupos
        },
        // lista() {
        //     //console.log('FProd Lista:', this.$store.state.lista)
        //     return this.$store.state.lista
        // },
        produtos: {
            get() {
                return this.$store.state.produtos
            }
        },
        idGrupo: {
            get() {
                return this.$store.state.idGrupo
            },
            set(id) {
                return this.$store.commit('setIdGrupo', id)
            }
        },
        idProduto: {
            get() {
                return this.$store.state.idProduto
            },
            set(id) {
                return this.$store.commit('setIdProduto', id)
            }
        },
        mensagens(){
            //console.log('msg', this.$store.state.mensagens)
            return this.$store.state.mensagens
        },
    },

    methods: {
        listar(grupoKey) {
            this.mostrarProduto = grupoKey
            //console.log('listar', grupoKey)
            //console.log('produtos', this.produtos)
            //this.$store.commit('listar', grupoKey)
            //console.log('grupos', this.grupos[grupoKey].grupo, this.grupos[grupoKey].open)
            //this.$store.dispatch('listar', grupoKey)
        },
        editarProduto(editProd) {
            ///console.log('editar prod',editProd)
            this.idProduto = editProd
        },
        editarGrupo(id) {
            //console.log('ed grupo',id)
            this.idGrupo = id
            //bus.$emit('editarGrupo', this.dados)
        },

    },
    mounted() {
        //this.$store.commit('listar', 'XXX')
        //console.log('onde estoou:', this.$route.path)
        window.uid = 'Qualquer coisa'
        //console.log('uso:', window.uid)
        if (window.uid !== undefined) {
            this.edita = true
        } else {
            this.edita = false
        }
        // if (this.dados == 'produtos') {
        //     this.fields.push({ key: 'actions', label: 'Ações' })
        // }

    },
    created() {
        this.$store.dispatch('consultaGrupos')
        this.$store.dispatch('consultaProdutos')
        //console.log('Grupo', this.grupos)
        //this.listar('XXX')
        //  this.$store.commit('consultaProdutos')
    },
    beforeUpdate(){
        
    },
    updated(){
        //console.log('updated')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
