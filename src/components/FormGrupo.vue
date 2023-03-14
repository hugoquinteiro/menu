<template>
  <div class="formulario">

    <b-modal ref="modal-grupo" id="modal-grupo" v-model="modalgrupo" hide-footer title="Cadastro de Grupo" @hidden="closeModal">
        <b-alert dismissible v-for="mensagem in mensagens" :key="mensagem.texto" v-model="mensagem.ativar" :variant="mensagem.tipo">
            {{ mensagem.texto }}
        </b-alert>  
        <b-form-group label="Grupo">
            <b-form-input v-model="grupo.grupo"  placeholder="Defina nome do Grupo"></b-form-input>
        </b-form-group>
        <b-form-group label="Cor">
            <b-button pill  class="ml-1 p2" v-for="cor in optionsCor"  @click="grupo.cor=cor.value" :variant=cor.value :key="cor.value" >
                <i v-if="grupo.cor===cor.value" 
                class="fa fa-check-circle"></i>
                <i v-else class="fa fa-plug"></i>
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

export default {
//   components: {validaDados},
  data(){
    return {

        grupos:[],
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
  computed: {
    modalgrupo: {
        get() {
            return this.$store.state.modalgrupo
        },
        set() {
            return this.$store.commit('setmodalgrupo', false)
        }
    },
    grupo:{
        get(){
            return this.$store.getters.getGrupo
        },
    }
  },
  methods: {
    salvarGrupo(){
        //console.log('salvarGrupo', this.grupo)
        this.$refs['modal-grupo'].hide()
        this.$store.dispatch('salvarGrupo', this.grupo).then(_ => this.$store.dispatch('consultaGrupos')) 
    },
    excluirGrupo(id){
        this.$refs['modal-grupo'].hide()
        this.$store.dispatch('excluirGrupo', id).then(_ => this.$store.dispatch('consultaGrupos'))
    },
    closeModal() {
        //console.log('Fechou MODAL')
        this.$store.dispatch('consultaGrupos')
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
