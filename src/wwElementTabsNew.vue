<template>
    <wwLayout path="tabContent" />
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
        handleKeyDown(event) {
            const isVertical = this.content.orientation === 'vertical';
            const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
            const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

            if (event.key === prevKey || event.key === nextKey) {
                const currentIndex = this.tabTriggers.findIndex(tab => tab.id === this.computedActiveTab);
                const newIndex =
                    event.key === prevKey
                        ? (currentIndex - 1 + this.tabTriggers.length) % this.tabTriggers.length
                        : (currentIndex + 1) % this.tabTriggers.length;

                this.setActiveTab(this.tabTriggers[newIndex].id);
                this.tabTriggers[newIndex].element.focus();
            }
        },
    },
    provide() {
        return {
            activeTabProvided: computed(() => this.computedActiveTab),
            setActiveTab: this.setActiveTab,
            registerTabTrigger: this.registerTabTrigger,
            activationMode: this.content.activationMode,
            loadAllTabs: this.content.loadAllTabs,
        };
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    unmounted() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
};
</script>

<style lang="scss" scoped>
</style>
