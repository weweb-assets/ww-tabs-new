<template>
    <wwLayout path="tabContent" />
</template>

<script>
import { computed, ref } from 'vue';

export default {
    components: {},
    props: {
        uid: { type: String, required: true },
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwFrontState: { type: Object, required: true },
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: [],
    setup(props) {
        const { value: activeTab, setValue: setActiveTab } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'activeTab',
            type: 'string',
            defaultValue: computed(() => String(props.content.defaultActiveTab || '')),
        });

        return {
            activeTab,
            setActiveTab,
        };
    },
    data() {
        return {
            tabTriggers: [],
        };
    },
    computed: {
        computedActiveTab: {
            get() {
                return this.activeTab;
            },
            set(newValue) {
                this.setActiveTab(newValue);
            },
        },
        computedActivationMode() {
            return this.content.activationMode;
        },
        computedLoadAllTabs() {
            return this.content.loadAllTabs;
        },
    },
    watch: {
        computedActiveTab: {
            immediate: true,
            handler(newValue, oldValue) {
                this.$emit('trigger-event', {
                    name: 'onValueChanged',
                    event: { newValue: newValue, oldValue: oldValue },
                });
            },
        },
    },
    mounted() {},
    methods: {
        setActiveTab(tabName) {
            this.computedActiveTab = tabName;
        },
        setFocusTab(tabName) {
            this.tabTriggers.forEach(tab => {
                tab.focus = tab.id === tabName;
            });
        },
        getFocusTab() {
            return this.tabTriggers.find(tab => tab.focus)?.id || '';
        },
        handleBlurTab(tabName) {
            this.tabTriggers.find(tab => tab.id === tabName).focus = false;
        },
        registerTabTrigger(tabName, element) {
            this.tabTriggers.push({ id: tabName, element, focus: false });
        },
        handleKeyDown(event) {
            const isVertical = this.content.orientation === 'vertical';
            const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
            const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

            if (event.key === prevKey || event.key === nextKey) {
                const currentIndex = this.tabTriggers.findIndex(
                    tab => tab.id === (this.getFocusTab())
                );
                if(currentIndex === -1) {
                    return;
                }
                const newIndex =
                    event.key === prevKey
                        ? (currentIndex - 1 + this.tabTriggers.length) % this.tabTriggers.length
                        : (currentIndex + 1) % this.tabTriggers.length;
                this.setFocusTab(this.tabTriggers[newIndex].id);
                this.tabTriggers[newIndex].element.focus();
            }
        },
    },
    provide() {
        return {
            activationMode: computed(() => this.computedActivationMode),
            activeTabProvided: computed(() => this.computedActiveTab),
            loadAllTabs: computed(() => this.computedLoadAllTabs),
            onBlurTab: this.handleBlurTab,
            registerTabTrigger: this.registerTabTrigger,
            setActiveTab: this.setActiveTab,
            setFocusTab: this.setFocusTab,
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
