<template>
    <div>
        <ul>
            <li>1</li>
            <li v-for="item in list" :key="item.id">{{ item.title }}</li>
            <li>1</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
    mounted() {},
}
</script>
<style lang="scss" scoped></style>
