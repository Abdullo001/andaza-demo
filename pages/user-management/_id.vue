<template>
  <div>
    <v-card color="#fff" elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ user.username }}</div>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            Delete
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg"
          >
            <v-img src="/edit.svg" class="mr-1"/>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
       <v-row>
         <v-col>
           <div class="mb-2 text-body-1">Photo</div>
           <v-img src="/user-image.png" class="rounded-lg mb-4" width="120"/>
           <div class="mb-1 text-body-1">Username</div>
           <div class="black--text text-body-1 mb-5">{{user.username}}</div>
           <div class="mb-2 text-body-1">Lang</div>
           <v-img src="/uz.svg" max-width="25" class="rounded-md" contain/>
         </v-col>
         <v-col>
           <div class="mb-2 text-body-1">ID</div>
           <div class="black--text text-body-1 mb-5">{{user.id}}</div>
           <div class="mb-1 text-body-1">Lastname</div>
           <div class="black--text text-body-1 mb-10">{{user.lastName}}</div>
           <div class="mb-2 text-body-1">E-mail</div>
           <div class="black--text text-body-1 mb-5">{{user.email}}</div>
           <div class="mb-2 text-body-1">Registered date</div>
           <div class="black--text text-body-1 mb-5">09.11.2022 17:16:32</div>
         </v-col>
         <v-col>
           <div class="mb-2 text-body-1">First name</div>
           <div class="black--text text-body-1 mb-5">{{user.firstName}}</div>
           <div class="mb-1 text-body-1">Phone number</div>
           <div class="black--text text-body-1 mb-10">{{user.phoneNumber}}</div>
           <div class="mb-2 text-body-1">Status</div>
           <div class="black--text text-body-1 mb-5">{{user.status}}</div>
           <div class="mb-2 text-body-1">Password</div>
           <div class="black--text text-body-1 mb-5">1234567</div>
         </v-col>
       </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:  {
        id: 5481,
        username: 'Jane Cooper',
        avatar: '/avatar-user.svg',
        email: 'awesome@asgardia.team',
        firstName: 'Lisa',
        lastName: 'Doe',
        phoneNumber: '+998 90 564 01 03',
        lang: 'UZ',
        status: 'Active',
        selected: false
      },
    }
  },
}
</script>

<style scoped>
.v-btn--outlined {
  border: 1px solid;
}
</style>
