<template>
    <header class="header">
        <h1 v-if="idUser" class="user">
            <i class="fa fa-user"></i>
            <span class="ml-1">Admin</span>
        </h1>
        
        <h1 class="title">
            {{ title }}
        </h1>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed:{
        idUser (){
            //console.log('Header', this.$store.state.idUser)
            return this.$store.state.idUser
        }
    },
    created(){
        //console.log('uid', this.idUser)
        
    }

}
</script>

<style>


    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
        
        
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user{
        color:   #fff;
        position: absolute;
        right: 0px;
        padding: 10px;
        
    }
    .user > span{
        font-size: 0.9rem;
    }
</style>