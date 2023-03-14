<template>
    <footer class="footer">
        <span>Copyright <strong>Ehvoluti</strong> © 2019-2023</span>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        font-size: 0.7rem;
    }
</style>
