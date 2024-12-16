# Getting A Value

You can get a value from Vue Simple Phone by just using `v-model`. The returned value will be a `ParsedPhoneNumber` from [`awesome-phonenumber`](https://www.npmjs.com/package/awesome-phonenumber)
```vue
<script setup>
import { ref } from 'vue'
import { VueSimplePhone } from 'vue-simple-phone'
import 'vue-simple-phone/themes/light.css' // Include the default theme

const phone = ref();
</script>

<template>
  {{ phone }}
  <VueSimplePhone v-model="phone" />
</template>
```

Try out it right here! Try typing some numbers in the input below!
<script setup>
import { ref } from 'vue'
import { getExample } from 'awesome-phonenumber'
import '../../src/themes/light.css'

const phone = ref();
</script>

<VueSimplePhone v-model="phone" :value="getExample('US').number?.national || ''"/>
<pre>
{{ phone }}
</pre>
