<template>
    <div class="FormProduto">
        <b-modal id="modal-produto" ref="modal-produto" v-model="modalProduto" hide-footer title="Cadastrar Produto"
            @hidden="closeModal">
            <b-form-group label="Produto">
                <b-form-input v-model="produto.produto" placeholder="Defina nome do Produto"></b-form-input>
            </b-form-group>

            <b-form-group label="Preço">
                <b-form-input id="valor" v-model="produto.valor1" v-money="money"
                    placeholder="Valor do produto"></b-form-input>
            </b-form-group>

            <b-form-group class="flex-column d-flex align-items-center">
                <!-- <input ref="input" type="file" class="d-none" accept="image/*"  @change="handleFile($event) "> -->
                <b-form-file 
                    placeholder="Selecione a imagem"
                    drop-placeholder="Drop file here..."
                    @change="handleFile($event)"
                > 
                <!-- @change="handleFile($event)" -->
                <!-- v-model="produto.imageFile" -->
                    
                </b-form-file>
                <!-- <b-button @click="uploadFile">Upload</b-button>
                <div v-if="imageFile != ''"> File: {{ imageFile.name }}
                    <button class="btn badge badge-ligth" @click="imageFile = ''"><i class="fa fa-trash"></i></button>
                </div> -->
            </b-form-group>

            <b-row>
                <b-col cols="10">
                    <b-button @click="salvarProduto">{{ produto.id ? 'Salvar' : 'Incluir' }}</b-button>
                </b-col>
                <b-col>
                    <b-button v-if="produto.id" variant="danger" class="ml-2" align-h="end"
                            @click="excluirProduto(produto.id)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </b-col>
            </b-row>

        </b-modal>

    </div>
</template>

<script>
import bus from './barramento'
import { Money } from 'v-money'
export default {
    components: { Money },
    data() {
        return {
            money: {
                decimal: ',',
                thousands: '.',
                precision: 2,
                masked: false,
            },
            imageFile:''

        }
    },
    computed: {
        mensagens: {
            get() {
                return this.$store.state.mensagens
            }
        },
        modalProduto: {
            get() {
                this.imageFile =''
                return this.$store.state.modalProduto
            },
            set() {
                return this.$store.commit('setmodalProduto', false)
            }
        },
        produto: {
            get() {
                //console.log('FormProd: GET',this.$store.getters.getProduto)
                return this.$store.getters.getProduto
            },
        },
        // imageFile: {
        //     get() {
        //         return this.$store.state.imageFile === 'XXX' ?  [] : this.$store.state.imageFile
        //     },
        //     set(img) {
        //         console.log('SET imageFile')
        //         return this.$store.commit('setImageFile', img)
        //     }
        // },

    },
    methods: {

        salvarProduto() {
            //console.log('FormProd Salvar',this.produto)
            this.$refs['modal-produto'].hide()
            this.$store.dispatch('salvarProduto', {item:this.produto, img:this.imageFile})
                // .then(_ => {
                //     this.$store.dispatch('consultaProdutos')
                //     //console.log('produtos', this.produtos)
                // })
            //.finally(_ => this.$store.commit('listar', 'XXX'))


        },

        excluirProduto(id) {
            this.$refs['modal-produto'].hide()
            this.$store.dispatch('excluirProduto', this.produto)
                //.then(_ => this.$store.dispatch('consultaProdutos'))
        },
        closeModal() {
            this.imageFile =''
            this.$store.dispatch('consultaProdutos')
        },
        uploadFile() {
            this.$refs.input.value = ''
            this.$refs.input.click()
        },
        handleFile(ev) {
            this.imageFile =''
            //console.log(ev.target.files[0])
            this.imageFile = ev.target.files[0]
            //this.$store.dispatch('salvarProduto', this.produto)
            //this.$store.state.imageFile = ev.target.files[0]
        },



    },
    created() {
        //   bus.$on('editarProduto', dados => {
        //     //console.log('Produto Bus', dados)
        //     this.$refs['modal-produto'].show()
        //     this.produto.id = dados.id
        //     this.produto.produto = dados.produto
        //     this.produto.grupo = dados.grupo
        //     this.produto.valor1 = dados.valor1
        // })
    },
    mounted() {
        // this.$http.get('grupos.json',this.grupo)
        //     .then(res => {
        //         this.grupos = Object.entries(res.data).map( (v) => {
        //             return  {value:v[0], text:v[1].grupo}
        //         })
        //         //console.log('Grupos:', this.options)  
        //     })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
