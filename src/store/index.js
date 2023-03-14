import Vue from 'vue'
import Vuex from 'vuex'
import bus from '../components/barramento'

import { initializeApp } from "firebase/app";
//import { getDatabase, set, ref, onValue, get, child } from "firebase/database";
import { getStorage, uploadBytes,ref, uploadBytesResumable, getDownloadURL,  deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY
  , authDomain: process.env.VUE_APP_AUTH_DOMAIN
  , databaseURL: process.env.VUE_APP_DATABASE_URL
  , projectId: process.env.VUE_APP_PROJECT_ID
  , storageBucket: process.env.VUE_APP_STORAGE_BUCKET
  , messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
  , appId: process.env.VUE_APP_ID
  , measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grupos: [],
    idGrupo: '',
    idProduto: '',
    modalgrupo: false,
    modalProduto: false,
    produtos: [],
    mensagens: [],
    grupo: {
      grupo: '',
      cor: ''
    },
    produto: {
      produto: '',
      valor1: 0,
      grupo: '',
      
    },
    dados: [],
    lista: [],
    dismissCountDown: 0,
    idUser: '',
    // imageFile:''
  },
  getters: {
    getGrupo: state => {
      return state.grupo
    },
    getGrupos: state => {
      return state.grupos
    },
    getProduto: state => {
      return state.produto
    }

  },
  mutations: {
    consultaProdutos(state, payload) {
      state.produtos = payload
    },
    consultaGrupos(state, payload) {
      state.grupos = payload
    },
    setIdGrupo(state, payload) {
      if (payload === 1) {
        state.modalgrupo = true
        state.grupo = {
          grupo: '',
          cor: ''
        }
      } else {
        state.idGrupo = payload
        state.grupo = Object.entries(state.grupos).filter(v => {
          return v[0] === state.idGrupo
        })[0][1]
        state.grupo.id = state.idGrupo
        state.modalgrupo = true
      }
    },
    setIdProduto(state, payload) {
      //console.log('vuex', payload)
      if (payload.novo == true) {
        state.modalProduto = true
        state.produto = {
          produto: '',
          valor1: 0,
          url:null
        }
        state.produto.grupo = payload.grupo
      } else {
        state.idProduto = payload.id
        //console.log(state.produto)
        let temp = Object.entries(state.produtos).filter(v => {
          //console.log(v[0]+'==='+state.idProduto)
          //console.log(v[1].produto)
          return v[0] === state.idProduto
        })
        state.produto = temp[0][1]
        state.produto.id = state.idProduto
        state.modalProduto = true
        //console.log('vx prod', temp[0][1])
      }
    },
    setmodalgrupo(state, payload) {
      //console.log('setmodalgrupo:', payload)
      state.modalgrupo = payload
    },
    setmodalProduto(state, payload) {
      //console.log('setmodalgrupo:', payload)
      state.modalProduto = payload
    },
    setMensagens(state, payload) {
      state.mensagens = []
      state.mensagens.push(payload)
    },
    setIdUser(state, payload) {
      state.idUser = payload
    },
    // setImageFile(state, payload){
    //   console.log('VX imageFile', payload)
    //   state.imageFile = payload
    // }

  },
  // --------------- Actions --------------
  actions: {
    consultaGrupos(context) {
      Vue.prototype.$http.get('grupos.json').then(async res => {
        let dados = await res.data
        context.commit('consultaGrupos', dados)
      })
    },
    consultaProdutos(context) {
      Vue.prototype.$http.get('produtos.json').then(async res => {
        let dados = await res.data
        context.commit('consultaProdutos', dados)
      })

    },
    salvarGrupo(context, payload) {
      context.grupo = payload
      const metodo = context.grupo.id ? 'patch' : 'post'
      const finalUrl = context.grupo.id ? `/${context.grupo.id}.json` : '.json'
      if (bus.validaDados('grupo', context.grupo)) {
        Vue.prototype.$http[metodo](`grupos${finalUrl}`, context.grupo)
          .then(_ => {
            context.commit('setMensagens', { texto: "Ok: Grupo Salvo!!", tipo: 'success', tempo: 2, ativar: true })
          })
          .catch(err => console.log('Err', err))
      } else {
        context.commit('setMensagens', { texto: "ERRO: Preencher todos os campos!!", tipo: 'danger', tempo: 2, ativar: true })
      }
    },

    excluirGrupo(context, payload) {
      //console.log('Vuex Excluir Grupo:', payload)
      Vue.prototype.$http.delete(`/grupos/${payload}.json`)
        .then(_ => {
          this.grupo = {}
          context.commit('setMensagens', { texto: "Grupo foi apagado!!", tipo: 'warning', tempo: 2, ativar: true })
        })
    },
    excluirProduto(context, payload) {
      //Excluir imagem
      //console.log('Excluir VX', payload)
      if (payload.nameFile){
        const storageRef = ref(storage,payload.nameFile);
        // Delete the file
        deleteObject(storageRef).then(() => {
          excluir()
        }).catch((error) => {
           console.log(error) 
        });
      } else {
        excluir()
      }

      function excluir(){
        Vue.prototype.$http.delete(`/produtos/${payload.id}.json`)
          .then(_ => {
            context.dispatch('consultaProdutos')
            context.commit('setMensagens', { texto: "Produto foi apagado!!", tipo: 'warning', tempo: 2, ativar: true })
            //console.log(' excluir produto', id)
          })
          .catch(err => this.mensagens = [{ texto: err, tipo: 'danger', tempo: 2, ativar: true }])
      }
    },

    salvarProduto(context, payload) {
      console.log ('vuex', payload.img, payload.item)
      let imageFile = payload.img
      context.produto = payload.item
//      console.log('Vue context', context.produto)
      if (imageFile=== undefined || imageFile == ''){
        //console.log('Vue imageFile', imageFile, context.produto)
        context.produto.hasOwnProperty('id') ? true : context.produto.url = 'X'
        salvar()
        //context.dispatch('consultaProdutos')
      } else {
        //Tratar para Salvar Imagem
        let nameFile = payload.item.produto + '-' + (new Date().getTime())
        context.produto.nameFile = nameFile
        const storageRef = ref(storage,nameFile);
        uploadBytes(storageRef, imageFile).then((snapshot) => {
          //console.log('Uploaded a blob or file!', snapshot);
          getDownloadURL(snapshot.ref)
          .then((url) => {
            //console.log('LINK', url)
            context.produto.url = url
            salvar()
            //context.dispatch('consultaProdutos')
          })
          .catch( err => console.log('Erro File', err))
          .finally(_ =>{
          })
        });
      }
      //console.log('Vue Prod', payload)

      function salvar(){
        //context.produto.url = url
        //console.log(context.produto)
        const metodo = context.produto.hasOwnProperty('id') ? 'patch' : 'post'
        const finalUrl = context.produto.id ? `/${context.produto.id}.json` : '.json'
        if (bus.validaDados('produto', context.produto)) {
          Vue.prototype.$http[metodo](`produtos${finalUrl}`, context.produto)
            .then(_ => {
              context.dispatch('consultaProdutos')
              context.commit('setMensagens', { texto: "Ok: Produto Salvo!!", tipo: 'success', tempo: 2, dismissCountDown: 0 })
              //console.log('vx msg', context.mensagens)
              //console.log(teste())
            })
            .catch(err => console.log('Err', err))
          //console.log(state.produto)
        } else {
          context.commit('setMensagens', { texto: "ERRO: Preencher todos os campos!!", tipo: 'danger', tempo: 2, ativar: true })
        }
        
      }
        // const metodo = context.produto.id ? 'patch' : 'post'
        // const finalUrl = context.produto.id ? `/${context.produto.id}.json` : '.json'
        // if (bus.validaDados('produto', context.produto)) {
        //   Vue.prototype.$http[metodo](`produtos${finalUrl}`, context.produto)
        //     .then(_ => {
        //       console.log('Gravou Item')
        //       context.commit('setMensagens', { texto: "Ok: Produto Salvo!!", tipo: 'success', tempo: 2, dismissCountDown: 0 })
        //       //console.log('vx msg', context.mensagens)
        //       //console.log(teste())
        //     })
        //     .catch(err => console.log('Err', err))
        //   //console.log(state.produto)
        // } else {
        //   context.commit('setMensagens', { texto: "ERRO: Preencher todos os campos!!", tipo: 'danger', tempo: 2, ativar: true })
        // }
    },

  },
  modules: {
  }
})


