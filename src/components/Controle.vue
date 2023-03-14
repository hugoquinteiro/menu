<template>
  <div class="controle">
    <!-- <b-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :variant="mensagem.tipo">
			{{ mensagem.texto }}
	</b-alert> -->
    <b-container fluid>
        <div>
            <h1>Administrador de Dados</h1>
            <div class="row">
                <!-- Grupos                 -->
                <b-card
                    title="Grupos"
                    img-src="../assets/grupo2.jpg"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text>
                        Manutenção no cadastro de Grupos
                    </b-card-text>
                    <div class="row">
                        <b-button v-b-modal.modal-grupo class="ml-3">Administrar</b-button>
                        <b-button href="#" variant="primary" class="ml-3" @click="listar('grupo')">Listar</b-button>
                    </div>
                </b-card>
                 <!-- Produtos    -->
                <b-card
                    title="Produtos"
                    img-src="../assets/produtos.jpg"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="ml-4"
                >
                    <b-card-text>
                        Manutenção no cadastro de Produtos
                    </b-card-text>
                    <div class="row">
                        <b-button v-b-modal.modal-produto class="ml-4">Administrar</b-button>
                        <b-button href="#" variant="primary" class="ml-3" @click="listar('produto')">Listar + {{ temp }}</b-button>
                    </div>
                </b-card>
                                
            </div>            

            
            <b-modal ref="modal-grupo" id="modal-grupo" hide-footer title="Cadastro de Grupo">
                <b-alert dismissible v-for="mensagem in mensagens" :key="mensagem.texto" v-model="mensagem.ativar" :variant="mensagem.tipo">
                    {{ mensagem.texto }}
                </b-alert>  
                <p class="my-4">Cadastrar Grupo</p>
                <b-form-group label="Grupo">
                    <b-form-input v-model="grupo.grupo"  placeholder="Defina nome do Grupo"></b-form-input>
                </b-form-group>
                <b-form-group label="Cor">
                    <b-form-select v-model="grupo.cor" :options="optionsCor" variant="dark"></b-form-select>
                </b-form-group>
                <b-button @click="salvarGrupo">Salvar</b-button>
            </b-modal>
            
       
            <b-modal id="modal-produto"  ref="modal-produto" hide-footer title="Cadastrar Produto">
                <b-alert dismissible v-for="mensagem in mensagens" :key="mensagem.texto" v-model="mensagem.ativar" :variant="mensagem.tipo">
                    {{ mensagem.texto }}
                </b-alert>
                <b-form-group label="Produto">
                    <b-form-input v-model="produto.produto"  placeholder="Defina nome do Produto"></b-form-input>
                </b-form-group>
                <b-form-group label="Grupo">
                    <b-form-select v-model="produto.grupo" :options="grupos" variant="dark"></b-form-select>
                </b-form-group>
                <b-form-group label="Preço">
                    <b-form-input id="valor" v-model="produto.valor1" v-money="money" placeholder="Valor do produto"></b-form-input>
                </b-form-group>


                <b-button @click="salvarProduto">{{ produto.id ? 'Salvar' : 'Incluir' }}</b-button>
                <b-button v-if="produto.id" variant="danger" class="ml-2"  @click="excluirProduto(produto.id)">
                    <i class="fa fa-trash"></i>  
                </b-button>
            </b-modal>            
        </div>

        <!-- <Listar v-show="tabela" :dados="dadosTable"/> -->
        <Inicio v-show="tabela" :dados="dadosTable" @editarProduto="editarProduto($event) "/>
    </b-container>
    
  </div>
</template>

<script>
import Listar from './ListarDados'
import Inicio from './Inicio'
import {Money} from 'v-money'

export default {
  components: {Money, Listar, Inicio},  
  data(){
    return {
        grupos:[],
        grupo: {
            grupo:'',
            cor:''
        },
        produtos:[],
        produto:{
            produto:'',
            valor1:0,
            grupo:''

        },
        mensagens:[],
        options: [],
        optionsCor: [
            {value: 'primary', text:'Azul'},
            {value: 'warning', text:'Amarelo'},
            {value: 'success', text:'Verde'},
            {value: 'danger', text:'Vermelho'}
        ],
        money: {
          decimal: ',',
          thousands: '.',
          // prefix: 'R$ ',
          precision: 2,
          masked: false
        },
        tabela:false,
        dadosTable: 'produtos'
        ,temp:''
        ,metodo:'POST'
    }
  },
  computed:{
    //Teste para mascara do campo valor, mas não funcionou
    //   campoValor(){
    //       console.log(this.produto.valor1.replace(/\D/g, ""))  
    //       this.produto.valor1 =  this.produto.valor1.replace(/\D/g, "");
    //   },
  },
  filters:{
  },
  methods: {
    salvarGrupo(){
        if (this.validaDados('grupo',this.grupo)){
            this.$http.post('grupos.json',this.grupo)
            .then(_ => this.mensagens.push({texto:"Ok: Grupo Salvo!!", tipo: 'success', tempo:2, ativar: true}))
            .catch(err => console.log('Err', err))
            console.log(this.grupo)

        } else {
            //this.$refs['modal-grupo'].hide()
            this.mensagens.push({texto:"ERRO: Preencher todos os campos!!", tipo: 'danger', tempo:2, ativar: true})
        }
    },
    editarProduto(valor){
        //console.log('Editar Controle:',valor)
        this.produto = {...valor}
        console.log('Editar Controle:',this.produto)
        this.$refs['modal-produto'].show()
        this.metodo = 'PUT'
        //this.$bvModal.show('    ')
        //this.produto = this.produtos[this.temp]
        //console.log('Editar Controle', this.temp  )
    },
    salvarProduto(){
        console.log('Salvar', this.validaDados('produto',this.produto))
        const metodo = this.produto.id ? 'patch' : 'post'
		const finalUrl = this.produto.id ? `/${this.produto.id}.json` : '.json'
        if (this.validaDados('produto',this.produto)){
            this.$http[metodo](`produtos${finalUrl}`,this.produto)
            .then(_ => this.mensagens.push({texto:"Ok: Produto Salvo!!", tipo: 'success', tempo:2, ativar: true}))
            .catch(err => console.log('Err', err))
            console.log(this.produto)
        } else {
            this.mensagens.push({texto:"ERRO: Preencher todos os campos!!", tipo: 'danger', tempo:2, ativar: true})
        }
    },
    excluirProduto(id){
        this.$http.delete(`/produtos/${id}.json`)
        .then( _ => {
            this.mensagens = [{texto:"Produto foi apagado!!", tipo: 'success', tempo:2, ativar: true}]
            console.log(' excluir produto', id)
        })
        .catch( err => this.mensagens = [{texto:err, tipo: 'danger', tempo:2, ativar: true}])
    },
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
    },
    listar(tab){
        this.dadosTable = 'produtos'
        if (tab=='produto'){
            // this.$http.get('produtos.json').then(res =>{
            //     Object.values(res.data).forEach((v) => this.dadosTable.push(v))
            // })
            this.tabela=true
        }

        if (tab=='grupo'){
            this.tabela=true
            // this.$http.get('grupos.json').then(res =>{
            //     Object.values(res.data).forEach((v) => this.dadosTable.push(v))
            // })
        } 
    }    
  },
  mounted(){
    this.$http.get('grupos.json',this.grupo)
        .then(res => {
            this.grupos = Object.entries(res.data).map( (v) => {
                return  {value:v[0], text:v[1].grupo}
            })
            //console.log('Grupos:', this.options)  
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #valor{
    text-align: end;
 }
</style>
