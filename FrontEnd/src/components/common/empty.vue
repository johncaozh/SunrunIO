<template>
    <div class="verticalDiv">
        <svg>
            <use xlink:href="#empty"></use>
        </svg>
        <b class="content">{{content}}</b>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            required: false,
            default: "这里什么都没有",
            type: String
        }
    }
}
</script>

<style scoped>
.verticalDiv {
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

svg {
    width: 300px;
    height: 300px;
}

.content {
    margin-top: -60px;
    font-size: 16px;
    font-weight: 500
}
</style>

