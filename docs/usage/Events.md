# Events

Vue Simple Phone has the following events

<script setup>
import '../../src/themes/light.css'
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const { site, theme, page, frontmatter } = useData()
const openedPropExample = ref(true);
</script>

## @update:modelValue ([`ParsedPhoneNumber`](../guide/binding.md))

Triggers when a user tries to input their number.

```vue
<VueSimplePhone @update:modelValue="(number) => console.log(number)"/>
```

## @open

Triggers when a user tried to open the dropdown via clicking on the button.

```vue
<VueSimplePhone @open="console.log('opening')"/>
```

## @close

Triggers when a user tried to close the dropdown via clicking outside, selecting a new country, clicking on the button.

```vue
<VueSimplePhone @close="console.log('closing')"/>
```

## Missing Something?

Create an <a :href="`${theme.socialLinks.find(social => social.icon === 'github').link}/issues`" target="_blank" rel="noreferrer">`issue`</a> on our GitHub! We very well may be able to add your feature.
