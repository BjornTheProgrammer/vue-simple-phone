# Slot

You can provide a label for Vue Simple Phone to use by passing in a slot.

```vue
<script setup>
import { VueSimplePhone } from 'vue-simple-phone'
import 'vue-simple-phone/themes/light.css' // Include the default theme
</script>

<template>
  <VueSimplePhone>Phone Number</VueSimplePhone
</template>
```

<script setup>
import '../../src/themes/light.css'
</script>
<VueSimplePhone style="padding-top: 10px;">Phone Number</VueSimplePhone>

