<template>
  <div class="controle">
    <b-container fluid>
        <div>
            <b-button v-b-modal.modal-grupo>Administrar Grupo</b-button>
        
            <b-modal id="modal-grupo" title="BootstrapVue">
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
        
            <b-modal id="modal-produto" title="BootstrapVue">
                <p class="my-4">Cadastrar Produto</p>
                <b-form-group label="Produto">
                    <b-form-input v-model="produto.produto"  placeholder="Defina nome do Produto"></b-form-input>
                </b-form-group>
                <b-form-group label="Grupo">
                    <b-form-select v-model="produto.grupo" :options="grupos" variant="dark"></b-form-select>
                </b-form-group>
                <b-form-group label="Preço">
                    <b-form-input v-model="produto.valor1"  placeholder="Valor do produto"></b-form-input>
                </b-form-group>


                <b-button @click="salvarProduto">Salvar</b-button>
            </b-modal>            
        </div>
    </b-container>
    
  </div>
</template>

<script>
export default {
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
            valor1:'',
            grupo:''

        },
        options: [],
        optionsCor: [
            {value: 'primary', text:'Azul'},
            {value: 'warning', text:'Amarelo'},
            {value: 'success', text:'Verde'},
            {value: 'danger', text:'Vermelho'}
        ]
    }
  },
  methods: {
    salvarGrupo(){
        this.$http.post('grupos.json',this.grupo)
        .then(res => console.log(res))
        .catch(err => console.log('Err', err))
        console.log(this.grupo)
    },
    salvarProduto(){
        this.$http.post('produtos.json',this.produto)
        .then(res => console.log(res))
        .catch(err => console.log('Err', err))
        console.log(this.produto)
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

</style>
