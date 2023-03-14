<template>
  <div class="cadGrupo">

    <b-modal ref="modal-grupo" id="modal-grupo" hide-footer title="Cadastro de Grupo">
        <b-alert dismissible v-for="mensagem in mensagens" :key="mensagem.texto" v-model="mensagem.ativar" :variant="mensagem.tipo">
            {{ mensagem.texto }}
        </b-alert>  
        <b-form-group label="Grupo">
            <b-form-input v-model="grupo.grupo"  placeholder="Defina nome do Grupo"></b-form-input>
        </b-form-group>
        <b-form-group label="Cor">
            <b-button pill  class="ml-1 p2" v-for="cor in optionsCor"  @click="grupo.cor=cor.value" :variant=cor.value :key="cor.value" >
                <i class="fa fa-plug"></i>
            </b-button>
        </b-form-group>
        <b-row>
            <b-col cols="10">
                <b-button class="ml-2" @click="salvarGrupo" variant="success">{{ grupo.id ? 'Salvar' : 'Incluir' }}</b-button>
            </b-col>
            <b-col cols="2">
                <b-button v-if="grupo.id" variant="danger" class="ml-2"  @click="excluirGrupo(grupo.id)">
                    <i class="fa fa-trash"></i>  
                </b-button>    
            </b-col>
        </b-row>
    </b-modal>
  </div>
</template>

<script>
// import validaDados from './validaDados'  
import bus from './barramento'
export default {
//   components: {validaDados},
  data(){
    return {
        grupos:[],
        grupo: {
            grupo:'',
            cor:''
        },
        mensagens:[],
        options: [],
        optionsCor: [
            {value: 'primary', text:'Azul'},
            {value: 'secondary', text:'Cinza'},
            {value: 'success', text:'Verde'},
            {value: 'danger', text:'Vermelho'},
            {value: 'warning', text:'Amarelo'},
            {value: 'info', text:'info'},
            {value: 'light', text:'Branco'},
            {value: 'dark', text:'Preto'},
        ],
    }
  },
  methods: {
    salvarGrupo(){
        //console.log('Salvar Grupo Form',)
        this.$store.commit('cadGrupo', this.grupo)
        this.$store.commit('consultaDados')
    },
    excluirGrupo(id){
        this.$http.delete(`/grupos/${id}.json`)
        .then( _ => {
            this.grupo = {}
            this.mensagens = [{texto:"Grupo foi apagado!!", tipo: 'success', tempo:2, ativar: true}]
        })
    },
    reset(){
        this.grupo.grupo='',
        this.grupo.cor=''
    },
  },
  created(){
      bus.$on('editarGrupo', dados => {
        this.$refs['modal-grupo'].show()
        // this.grupo.id = dados.id
        // this.grupo.grupo = dados.grupo
        // this.grupo.cor = dados.cor
        //this.grupo = dados
        console.log('Dados Bus', dados)
    })
    //console.log('Grupo',this.grupo)
    //this.grupo = this.dados
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
<style scoped>

</style>
