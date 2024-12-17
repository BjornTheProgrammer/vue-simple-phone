# Props

Vue Simple Phone has the following props

## region

The default region country code to use.

* Type: `String` a `ISO 3166-1` country code
* Default: `US`

## language

The display language for the country names.

* Type: [`Intl.LocalesArgument`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)
* Default: `['en']`

## value

The starting value to use.

* Type: `String`
* Default: `undefined`

## countries

The list of countries to display in the dropdown

* Type: `String[]`
* Default: [`country-flag-icons`](https://www.npmjs.com/package/country-flag-icons)'s list of countries

## Missing Something?

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

Create an <a :href="`${theme.socialLinks.find(social => social.icon === 'github').link}/issues`" target="_blank" rel="noreferrer">`issue`</a> on our GitHub! We very well may be able to add your feature.
