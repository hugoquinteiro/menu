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
    <div class="mt-2" v-for="(info, key) in grupos">
      <b-row>
        <b-col>
          <b-button block :variant="info.cor" @click="listar(key)">
            {{ info.grupo }}
          </b-button>
        </b-col>
        <template v-if="editaGrupo">
          <b-button class="d-flex ml-md-auto" @click="editarGrupo(key)"><i class="fa fa-pencil"></i></b-button>
        </template>
      </b-row>
      <div>
        <b-table hover striped :items="lista" :fields="fields" v-show="info.open">
          <template v-slot:cell(actions)="data">
            <!-- slot="actions" slot-scope="data" -->
            <!-- v-slot:cell(actions)="data" -->
            <b-button variant="warning" class="mr-2" @click="editarProduto(data.index)">
              <i class="fa fa-pencil"></i>
            </b-button>
          </template>
        </b-table>
      </div>
    </div>
    <!-- <p>Produto</p>
          <div class="mt-2" v-for="produto in produtos" >
            <b-button block variant="dark" >{{produto}}</b-button>
          </div> -->
  </b-container>
</template>

<script>
import bus from './barramento'

export default {
  props: ['dados'],
  data() {
    return {
      temp: '',
      //grupos:[],
      //produtos: [],
      fields: [
        { key: 'produto', label: 'Produto', sortable: true, },
        { key: 'valor1', label: 'Preço 01', sortable: true, },
      ],
      lista: [],
      editaGrupo: false
    }
  },
  computed: {
    grupos: {
      get() {
        return this.$store.state.grupos
      }
    },
    produtos: {
      get() {
        return this.$store.state.produtos
      }
    },
  },

  methods: {
    listar(grupoKey) {
      Object.entries(this.grupos).map((v) => {
        if (v[0] === grupoKey) {
          v[1].open = true
        } else {
          v[1].open = false
        }
        return { v }
      })
      let idGrupo = Object.keys(this.grupos).filter(v => v === grupoKey)[0]
      this.lista = Object.entries(this.produtos).map((v) => {
        v[1].id = v[0]
        return v[1]
      })
        .filter((v) => {
          return v.grupo === idGrupo
        })
    },
    editarProduto(indice) {
      //console.log('editar',indice, this.lista[indice])
      //this.dados = indice
      Object.values(this.grupos).map(v => v.open = false)
      bus.$emit('editarProduto', this.lista[indice])
      //this.carregaInfo()
    },
    editarGrupo(idGrupo) {
      //console.log(idGrupo)
      let ObjGrupo = Object.entries(this.grupos)
        .filter(v => v[0] === idGrupo).map((v) => {
          v[1].id = v[0]
          return v[1]
        })
      bus.$emit('editarGrupo', ObjGrupo[0])
      //this.$store.commit('selecionaGrupo', ObjGrupo[0])
    },
    // carregaInfoOld(){
    //   this.$http.get('grupos.json').then(res =>{
    //     this.grupos = res.data
    //     this.temp = Object.keys(res.data)
    //     //console.log('temp', this.grupos)
    //     this.$http.get('produtos.json').then(resp =>{
    //       this.produtos = resp.data
    //     })
    //   })
    // }
    carregaInfo() {
      this.$store.getters.consultaGrupos.then(val => {
        //console.log('Consulta', val)
        this.grupos = val

      })
      this.$store.getters.consultaProdutos.then(val => {
        //console.log('Prod', val)
        this.produtos = val
      })
    }
  },
  mounted() {
    //console.log('onde estoou:', this.$route.path)

    if (this.$route.path === '/admin') {
      this.editaGrupo = true
    } else {
      this.editaGrupo = false
    }
    if (this.dados == 'produtos') {
      this.fields.push({ key: 'actions', label: 'Ações' })
    }


    //this.carregaInfo()
    this.$store.commit('consultaGrupos')
    this.$store.commit('consultaProdutos')

    //testando Firebase
    //console.log('firebase:',this.$firebase.firebaseApp)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
