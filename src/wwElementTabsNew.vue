<template>
    <div class="ww-tabs-new-container">
        <p>Active tab: {{ internalActiveTab }}</p>
        <wwElement class="ww-tab-list" v-bind="content.tabList" />

        <wwElement v-for="tabContent in content.tabContentElements" :key="tabContent" v-bind="tabContent" />
    </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    components: {},
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwFrontState: { type: Object, required: true },
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: [],
    setup(props) {},
    data() {
        return {
            tabTriggers: [],
            internalActiveTab: this.content.defaultActiveTab,
        };
    },
    computed: {
        computedActiveTab: {
            get() {
                return this.internalActiveTab;
            },
            set(newValue) {
                this.internalActiveTab = newValue;
            },
        },
    },
    watch: {},
    mounted() {},
    methods: {
        setActiveTab(tabName) {
            this.computedActiveTab = tabName;
        },
        registerTabTrigger(tabName, element) {
            this.tabTriggers.push({ id: tabName, element });
        },
    },
    provide() {
        return {
            activeTabProvided: computed(() => this.computedActiveTab),
            setActiveTab: this.setActiveTab,
            registerTabTrigger: this.registerTabTrigger,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-tabs-new-container {
    background-color: purple;
    padding: 10px;

    .ww-tab-trigger {
        background-color: blue;
    }
}
</style>
