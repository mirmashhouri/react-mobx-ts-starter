## Translations

As a good practice, each translation key will be uppercase and words will be separated with `_`: Example `TWO_WORDS`

We should not couple the translations to our components.

Translations should be in `COMMON` if they are used more than once or if they are common words.

We will have unique ones which will be coupled to the BE and their keys will be the id's we recieve from the BE.

Translated strings should be exactly the way we need them or if they are used more than once they should be Pascal Case and if we need them different we will use string operations.

We can separate them by the things they are for example strings in buttons will be inside `BUTTONS`, strings in headings will be inside `HEADINGS` etc.

---
