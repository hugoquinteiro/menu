<template>
    <b-container>
        <!-- <div>
            <div class="mt-2" v-for="(dados,index) in grupo">
                <b-button block :variant="dados.color" @click="listar(index)">{{dados.grupo}}</b-button>
                <div>
                  <b-table hover striped :items="lista" :fields="fields" v-show="dados.open"></b-table>                
                </div>
            </div>
      
        </div> -->

        <p>FIREBASE</p>
        <div class="mt-2" v-for="(info, key) in grupos" >
          <b-button block :variant="info.cor" @click="listar(key)" >{{info.grupo}}</b-button>
          <div>
            <b-table hover striped :items="lista" :fields="fields" v-show="info.open"></b-table>                
          </div>
        </div>
        <!-- <p>Produto</p>
        <div class="mt-2" v-for="produto in produtos" >
          <b-button block variant="dark" >{{produto}}</b-button>
        </div> -->
    </b-container>


</template>

<script>
export default {
  data(){
    return {
        temp:'',
        grupos:[],
        produtos: [],
        fields:[
            {key: 'produto', label: 'Produto', sortable: true, variant: 'secondary' },
            {key: 'valor1', label: 'Preço 01', sortable: true, variant: 'secondary' },
        ],
        // produtos:[
        //     {id:1, idgrup:1, descr:'Prancha Pro 480', preco1:0,preco2:0},
        //     {id:2, idgrup:2, descr:'Escova Secadora',preco1:10.6,preco2:50.99},
        //     {id:3, idgrup:1, descr:'Secador de Cabelo',preco1:10.6,preco2:50.99},
        //     {id:4, idgrup:4, descr:'Maq de Corte 01',preco1:10.6,preco2:50.99},
        //     {id:5, idgrup:3, descr:'Escova 100',preco1:10.6,preco2:50.99},
        //     {id:6, idgrup:3, descr:'Escova 110',preco1:5.09,preco2:29.99},
        //     {id:7, idgrup:3, descr:'Escova 120',preco1:10.6,preco2:50.99},
        // ],
        lista:[]

    }
  },
  methods: {
    listar(grupoKey){
        Object.entries(this.grupos).map((v) => {
          if (v[0] === grupoKey) {
            v[1].open = true
          }else{
            v[1].open = false
          }
            return {v }
        })
        let idGrupo = Object.keys(this.grupos).filter( v => v === grupoKey)[0]
        this.lista = Object.values(this.produtos).filter((v) => { return v.grupo === idGrupo})
    },
  },
  mounted(){
    //console.log('Inicio', this.grupo)
    this.$http.get('grupos.json').then(res =>{
      //console.log(res.data)
      this.grupos = res.data
      this.temp = Object.keys(res.data)
      //console.log('temp', this.grupos)
      this.$http.get('produtos.json').then(resp =>{
        this.produtos = resp.data
      })
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
