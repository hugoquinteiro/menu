<template>
  <div class="controle">
    <!-- <b-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :variant="mensagem.tipo">
			{{ mensagem.texto }}
	</b-alert> -->
    <b-container fluid>
        <div>
            <h1>Administrador de Dados</h1>
            <b-button v-b-modal.modal-grupo>Administrar Grupo</b-button>
        
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
            
            <b-button v-b-modal.modal-produto class="ml-4">Administrar Produtos</b-button>
        
            <b-modal id="modal-produto" title="Cadastrar Produto">
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


                <b-button @click="salvarProduto">Salvar</b-button>
            </b-modal>            
        </div>
    </b-container>
    
  </div>
</template>

<script>
import {Money} from 'v-money'

export default {
  components: {Money},  
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
        }
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
    salvarProduto(){
        console.log('Salvar', this.validaDados('produto',this.produto))
        if (this.validaDados('produto',this.produto)){
            this.$http.post('produtos.json',this.produto)
            .then(_ => this.mensagens.push({texto:"Ok: Produto Salvo!!", tipo: 'success', tempo:2, ativar: true}))
            .catch(err => console.log('Err', err))
            console.log(this.produto)
        } else {
            this.mensagens.push({texto:"ERRO: Preencher todos os campos!!", tipo: 'danger', tempo:2, ativar: true})
        }
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
