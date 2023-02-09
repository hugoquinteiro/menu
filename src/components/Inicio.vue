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
        <p>Produto</p>
        <div class="mt-2" v-for="produto in produtos" >
          <b-button block variant="dark" >{{produto}}</b-button>
        </div>
    </b-container>


</template>

<script>
export default {
  data(){
    return {
        temp:'',
        grupos:[],
        produtos: [],
        grupo:[
            {id:1, grupo:'MQ PRO', color:'primary', open:false},
            {id:2, grupo:'MQ Beauty', color:'warning', open:false},
            {id:3, grupo:'MQ Escovas', color:'success', open:false},
            {id:4, grupo:'Force Barber', color:'danger', open:false},
        ],
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
        lista:[],
        temp:[]

    }
  },
  methods: {
    listar(grupoKey){
        //console.log('Listar',Object.keys(this.grupos).filter( v => v === grupoKey)[0])
        //console.log(this.grupos)
        this.grupos = Object.entries(this.grupos).map((v) => {
          if (Object.keys(v) !== grupoKey) {
            v.open = false
            return {v }
          }
        })
        console.log('grupo',this.grupos)
        //this.grupos.open = Object.values(this.grupos.open).map(() => {return false})
        //let idGrupo = Object.keys(this.grupos).filter( v => v === grupoKey)[0]
        //this.grupo[grupoKey].open = true
        this.lista = Object.values(this.produtos).filter((v) => { return v.grupo === idGrupo})
        //console.log('grupo',this.lista)
    },
  //   created() {
  //   this.$http.post('usuarios.json', {
  //     nome: 'Maria',
  //     email: 'maria_maria@gmail.com'
  //   }).then(res => console.log(res))
  //   }    
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
    // console.log('grupo', this.grupos)
    // console.log('produtos', this.produtos)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
