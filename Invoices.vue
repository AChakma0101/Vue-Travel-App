<template>
    <div>
        <h1>Invoices</h1>
        <button @click="logout" class="btn">Logout</button>
    </div>
</template>

<script>
export default {
    methods: {
        logout(){
            window.user = null
            this.$router.push({name: 'Home'})
        }
    }
}
</script>