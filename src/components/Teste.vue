<template>
  <div>
    <b-container>
      <div v-for="(dados, keyMaster) in grupos">
        <h1 v-if="keyMaster==='tabela'" >Cadastro de {{ dados }}</h1>
        <div v-for="(grupos, key) in dados">
          <div class="row">
            <b-form-group v-if="keyMaster==='dados'" :label="key">
                <b-form-input :v-model=key  placeholder="Defina algo...." ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <b-button @click="salvar(dados)" v-if="keyMaster==='tabela'">Salvar</b-button>
      </div>
    </b-container>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        grupos: {tabela: "grupo",
                dados: {
                    grupo:'',
                    cor:'',
                    info:''
                }
        },
        tempTab:'',
        temp:{}

      }  
    },
    methods: {
      salvar(){
        console.log(this.grupos.dados)
        console.log('tempTab', this.tempTab)
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>