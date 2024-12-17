# Themes

Vue Simple Phone currently supports the following themes out of the box:

## [`vue-simple-phone/themes/light.css`](https://github.com/BjornTheProgrammer/vue-simple-phone/blob/main/src/themes/light.css)

<Suspense>
	<ThemedVueSimplePhone theme="light" />
</Suspense>


## [`vue-simple-phone/themes/light.css`](https://github.com/BjornTheProgrammer/vue-simple-phone/blob/main/src/themes/dark.css)

<Suspense>
	<ThemedVueSimplePhone theme="dark" />
</Suspense>

## Don't see a theme you like?

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

Create an <a :href="`${theme.socialLinks.find(social => social.icon === 'github').link}/issues`" target="_blank" rel="noreferrer">`issue`</a> on our GitHub! We may be able to add your prefered theme!
