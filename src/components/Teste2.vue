<template>
    <!-- Teste para Listar itens recebendo do Props -->
  <div>
    <b-container>
        <b-table hover striped :items="dados"></b-table>
        <b-button @click="Listar">Listar</b-button>

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
                // produtos:[
        //     {id:1, idgrup:1, descr:'Prancha Pro 480', preco1:0,preco2:0},
        //     {id:2, idgrup:2, descr:'Escova Secadora',preco1:10.6,preco2:50.99},
        //     {id:3, idgrup:1, descr:'Secador de Cabelo',preco1:10.6,preco2:50.99},
        //     {id:4, idgrup:4, descr:'Maq de Corte 01',preco1:10.6,preco2:50.99},
        //     {id:5, idgrup:3, descr:'Escova 100',preco1:10.6,preco2:50.99},
        //     {id:6, idgrup:3, descr:'Escova 110',preco1:5.09,preco2:29.99},
        //     {id:7, idgrup:3, descr:'Escova 120',preco1:10.6,preco2:50.99},
        // ],
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