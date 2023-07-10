<template>
    <div class="login-container">
        <div>
            <img class="d-block mb-4" src="@/assets/images/logo-login.png" width="420" height="40" alt="">
            <div class="form-group mb-3">
                <label for="username">Username</label>
                <input  class="form-control" type="text" name="username" id="username" v-model="username" >
            </div>
            <div class="form-group mb-3">
                <label for="password">Password</label>
                <input  class="form-control" type="password" v-model="password" name="password" id="password" >
            </div>
            <div class="form-group">
                <button class="btn" @click="login()">Login</button>
            </div>
        </div>
    </div>
    <MDBModal
        id="errorModal"
        tabindex="-1"
        labelledby="errorModalLabel"
        v-model="errorModal"
    >
        <MDBModalHeader>
        <MDBModalTitle id="errorModalLabel">Error</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>Make sure your username or password is correct.</MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color="secondary" @click="errorModal = false">Close</MDBBtn>
        </MDBModalFooter>
    </MDBModal>
</template>


<script>
  import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  } from 'mdb-vue-ui-kit';
import { ref } from 'vue';
export default {
    name:'login',
    components: {
      MDBModal,
      MDBModalHeader,
      MDBModalTitle,
      MDBModalBody,
      MDBModalFooter,
      MDBBtn,
    },
    setup(){
        const token = localStorage.getItem("token")
        const username = ref('')
        const password = ref('')
        const errorModal = ref(false);

        return { 
            username, 
            password,
            errorModal,
            token
        }
    },
    mounted(){
        if(this.token){
            this.$router.push({name:'backoffice'})
        }
    },
    methods:{
        login(){
            if(this.username == 'admin' && this.password == 'admin'){
                localStorage.setItem('token','kB0rRGGDMk2clQxJwle1Ha5seV4oQjq9IWuzv835zeUiAUfIY5HUMRPkWzqXAayb')
                this.$router.push({name:'backoffice'})
            } else {
                this.errorModal = true
            } 
        }
    }
}
</script>

<style>
    .login-container{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .login-container input{
        border-radius: 0;
        background: #FFFFFF;
        border: 1px solid #000000;
    }

    .login-container label{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        margin-left: 4px;
        margin-bottom: 5px;
    }

    .login-container button{
        width: 100%;
        background: #F0F0F0;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        text-transform: uppercase;
        border-radius: 0;
        padding: 10px 0;
    }

     .login-container button:hover{
         background: #F0F0F0;
     }
</style>