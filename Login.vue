<template>
    <div class="login">
        <form class="form" @submit.prevent="login">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input v-model="username" name="username" type="text" class="input">
            <label for="password">Password</label>
            <input v-model="password" name="password" type="text" class="input">
            <button class="btn">Login</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login(){
            //Generally, auth user against API but in this use case will store the username on the window
            window.user = this.username
            const redirectPath = this.$route.query.redirect || '/protected'
            //then redirect to the appropriate component
            //this.$router.push({name: 'protected'})
            this.$router.push(redirectPath)
        }
    },
}
</script>