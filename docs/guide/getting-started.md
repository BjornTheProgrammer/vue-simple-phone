# Getting Started

Vue Simple Phone is designed to be as easy as possible to use and to extend.

## Installation

1. Install from npm: `npm i vue-simple-phone`
2. Use and import in your code!

```vue
<script setup>
import { VueSimplePhone } from 'vue-simple-phone'
import 'vue-simple-phone/themes/light.css' // Include the default theme
</script>

<template>
  <VueSimplePhone />
</template>
```

<script setup>
import '../../src/themes/light.css'
</script>
<VueSimplePhone style="padding-top: 10px;">Phone Number</VueSimplePhone>
