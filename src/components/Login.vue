<template>
    <div>
        <b-container>
            <form @submit.prevent="doLogin()" class="form-login">
                <div class="card">
                    <div class="card-header text-center">
                        <h1 class="mb-0">Expenses</h1>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <input required type="email" v-model="email" class="form-control" placeholder="E-mail" />
                        </div>
                        <div class="form-group">
                            <input required type="password" v-model="password" class="form-control" placeholder="Senha" />
                        </div>
                        <button class="btn btn-primary w-100" :disabled="loading">
                            <template v-if="loading">
                                Entrando...
                                <i class="fa fa-spinner fa-spin"></i>
                            </template>
                            <template v-else>
                                Entrar
                                <i class="fa fa-sign-in-alt"></i>
                            </template>
                        </button>
                        Não tem conta?
                        <router-link to="/register" class="link mt-4">Clique aqui para Registrar</router-link>
                    </div>
                </div>
            </form>
        </b-container>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            loading: false
        }
    },
    computed:{
        userId:{
            get(){
                return this.$store.state.userId
            },
            set(id){
                return this.$store.commit('setIdUser', id)
            }
        }
    },

    methods: {
        async doLogin() {
            this.loading = true
            const auth = getAuth();
            const { email, password } = this
            try {
                //const res = await this.$firebase.auth.getAuth().signInWithEmailAndPassword(auth, email, password)
                const res = await signInWithEmailAndPassword(auth, email, password)
                console.log('Token', res)
                window.uid = res.user.uid
                this.userId = res.user.uid

                this.$router.push({ path: 'inicio2' })
            } catch (error) {
                console.log(error)
            }
            this.loading = false

        }
    }
}
</script>

<style></style>