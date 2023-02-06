<template>
    <b-container>
        <div>
            <div class="mt-2" v-for="dados in grupo" >
                <b-button block :variant="dados.color" @click="listar">{{dados.grupo}}</b-button>
                <b-table hover striped :items="produtos" ></b-table>                
            </div>
          <br>
          <b-table hover striped :items="produtos" ></b-table>
        </div>
    </b-container>
</template>

<script>
export default {
  data(){
    return {
        temp:'',
        grupo:[
            {grupo:'MQ PRO', color:'primary'},
            {grupo:'MQ Beauty', color:'warning'},
            {grupo:'MQ Escovas', color:'success'},
            {grupo:'Force Barber', color:'danger'},
        ],
        produtos:[
            {id:1, descr:'Prancha Pro 480'},
            {id:2, descr:'Escova Secadora'},
            {id:3, descr:'Secador de Cabelo'},
            {id:3, descr:'Maq de Corte 01'},
            {id:3, descr:'Maq de Corte 120'}
        ]
    }
  },
  methods: {
    listar(){
        console.log('Listar', this.grupo)
    }
  },
  monthed(){
    console.log(this.grupo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
