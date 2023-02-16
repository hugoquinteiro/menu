<template>
    <!-- Teste para Listar itens recebendo do Props -->
  <div>
    <b-container>
        <b-table hover striped :items="dados"></b-table>
        <b-button @click="Listar">Listar</b-button>
        <b-button size="sm" class="mb-2">
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings
        </b-button>

    </b-container>
  </div>

</template>

<script>
  export default {
    props:['dados'],
    data() {
      return {
        grupo:[
            {id:1, grupo:'MQ PRO', color:'primary', open:false},
            {id:2, grupo:'MQ Beauty', color:'warning', open:false},
            {id:3, grupo:'MQ Escovas', color:'success', open:false},
            {id:4, grupo:'Force Barber', color:'danger', open:false},
        ],
        tempTab:'',
        temp:{}

      }  
    },
    methods: {
      Listar(){
        console.log(this.props)
      },
    }
  }
</script>