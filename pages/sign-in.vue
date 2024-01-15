<template>
  <div>
    <label for="">
      login
      <input type="text" v-model="form.username">
    </label>
    <label for="">
      password
      <input type="text" v-model="form.password">
    </label>
    <button @click="signIn">sign in</button>
  </div>
</template>

<script lang="ts" setup>

const form = reactive({
  username: '',
  password: ''
})

async function signIn() {
  const { data } = await useFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(form)
  })
  const cookie = useCookie('sraka')
  cookie.value = data.value.access_token
}
</script>