<template>
    <b-container>
        <div>
            <div class="mt-2" v-for="(dados,index) in grupo" >
                <b-button block :variant="dados.color" @click="listar(index)">{{dados.grupo}} - {{index }}</b-button>
                <div>
                  <b-table hover striped :items="lista" v-show="dados.open"></b-table>                
                </div>
            </div>
          <br>
          <!-- <b-table hover striped :items="produtos"></b-table> -->
        </div>
    </b-container>
</template>

<script>
export default {
  data(){
    return {
        temp:'',
        grupo:[
            {id:1, grupo:'MQ PRO', color:'primary', open:false},
            {id:2, grupo:'MQ Beauty', color:'warning', open:false},
            {id:3, grupo:'MQ Escovas', color:'success', open:false},
            {id:4, grupo:'Force Barber', color:'danger', open:false},
        ],
        produtos:[
            {id:1, idgrup:1, descr:'Prancha Pro 480'},
            {id:2, idgrup:2, descr:'Escova Secadora'},
            {id:3, idgrup:1, descr:'Secador de Cabelo'},
            {id:4, idgrup:4, descr:'Maq de Corte 01'},
            {id:5, idgrup:3, descr:'Escova 100'},
            {id:6, idgrup:3, descr:'Escova 110'},
            {id:7, idgrup:3, descr:'Escova 120'},
        ],
        lista:[]

    }
  },
  methods: {
    listar(index){
        console.log('Listar',this.grupo[index], this.grupo[index].id)
        this.grupo.map((v) => {return v.open = false})
        this.grupo[index].open = true
        this.lista = this.produtos.filter((v) => { return v.idgrup === this.grupo[index].id})
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
