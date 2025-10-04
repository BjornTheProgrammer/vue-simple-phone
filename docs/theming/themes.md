# Themes

Vue Simple Phone currently supports the following themes out of the box:

## [`vue-simple-phone/themes/light.css`](https://github.com/BjornTheProgrammer/vue-simple-phone/blob/main/src/themes/light.css)

<Suspense>
	<ThemedVueSimplePhone theme="light" />
</Suspense>


## [`vue-simple-phone/themes/dark.css`](https://github.com/BjornTheProgrammer/vue-simple-phone/blob/main/src/themes/dark.css)

<Suspense>
	<ThemedVueSimplePhone theme="dark" />
</Suspense>

## [`vue-simple-phone/themes/cherry.css`](https://github.com/BjornTheProgrammer/vue-simple-phone/blob/main/src/themes/cherry.css)

<Suspense>
	<ThemedVueSimplePhone theme="cherry" />
</Suspense>

## [`vue-simple-phone/themes/light-square.css`](https://github.com/BjornTheProgrammer/vue-simple-phone/blob/main/src/themes/light-square.css)

<Suspense>
	<ThemedVueSimplePhone theme="light-square" />
</Suspense>

## [`vue-simple-phone/themes/dark-square.css`](https://github.com/BjornTheProgrammer/vue-simple-phone/blob/main/src/themes/dark-square.css)

<Suspense>
	<ThemedVueSimplePhone theme="dark-square" />
</Suspense>

## Don't see a theme you like?

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

Build one with the [`theme builder`](./theme-builder.md), or create an <a :href="`${theme.socialLinks.find(social => social.icon === 'github').link}/issues`" target="_blank" rel="noreferrer">`issue`</a> on our GitHub! We may be able to add your prefered theme!
