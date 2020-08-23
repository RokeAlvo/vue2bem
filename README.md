# vue2bem

Creating BEM scss classes in the style section from the template section classes

## Install

```npm i -g vue2bem```

## Usage

vue component file ```test.vue```:

``` vue
<template>
  <div class ="block1 block1_block1-mod">
    <p class=" block1__elem1"></p>
    <p class="block1__elem2 block1__elem2_elem2-mod1"></p>
    <p class="block1__elem2 block1__elem2_elem2-mod2"></p>
    <p class="block2__elem1"></p>
    <p class="block3"></p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
```

run vue2bem:

```vue2bem ./test.vue```

result in ```test.vue```:

```vue
<template>
  <div class="block1 block1_block-mod">
    <p class=" block1__elem1"></p>
    <p class="block1__elem2 block1__elem2_elem2-mod1"></p>
    <p class="block1__elem2 block1__elem2_elem2-mod2"></p>
    <p class="block2__elem1"></p>
    <p class="block3"></p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.block1 {
    &__elem1 {}
    &__elem2 {
        &_elem2-mod1 {}
        &_elem2-mod2 {}
    }
    &_block-mod {}
}
.block2 {
    &__elem1 {}
}
.block3 {}
</style>
```

## TODO

- add css mode
- add sass mode
- add pug mode
- add analysis of the content of the style section: create only those classes, that do not exist
