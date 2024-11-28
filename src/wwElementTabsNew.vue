<template>
    <wwLayout ref="tabs" path="tabContent" />
</template>

<script>
import { computed, ref, provide, onMounted, onUnmounted } from 'vue';
/* wwEditor:start */
import useTabsHint from './editor/useTabsHint';
/* wwEditor:end */

export default {
    props: {
        uid: { type: String, required: true },
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwFrontState: { type: Object, required: true },
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    setup(props, { emit }) {
        const tabs = ref(null);
        /* wwEditor:start */
        const {
            hintRegisterTab,
            hintUnregisterTab,
            hintRegisterContent,
            hintUnregisterContent,
            hintChangeTabName,
            hintChangeContentName,
        } = useTabsHint(emit);
        /* wwEditor:end */

        // Data
        const activeTab = ref(String(props.content.defaultActiveTab || ''));
        const tabTriggers = ref([]);

        // Methods
        const setActiveTab = tabName => {
            activeTab.value = tabName;
        };

        const setFocusTab = tabName => {
            tabTriggers.value.forEach(tab => {
                tab.focus = tab.id === tabName;
            });
            tabTriggers.value.find(tab => tab.id === tabName)?.element.focus();
        };

        const getFocusTab = () => {
            return tabTriggers.value.find(tab => tab.focus)?.id || '';
        };

        const getActiveTabIndex = () => {
            return tabTriggers.value.findIndex(tab => tab.id === activeTab.value);
        };

        const getPreviousTabName = index => {
            return tabTriggers.value[(index - 1 + tabTriggers.value.length) % tabTriggers.value.length].id;
        };

        const getNextTabName = index => {
            return tabTriggers.value[(index + 1) % tabTriggers.value.length].id;
        };

        function setNextActiveTab() {
            const currentIndex = getActiveTabIndex();
            const nextIndex = getNextTabName(currentIndex);
            setActiveTab(nextIndex);
            setFocusTab(nextIndex);
        }

        function setPrevActiveTab() {
            const currentIndex = getActiveTabIndex();
            const prevIndex = getPreviousTabName(currentIndex);
            setActiveTab(prevIndex);
            setFocusTab(prevIndex);
        }

        function handleKeyDown(event) {
            const isVertical = props.content.orientation === 'vertical';
            const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
            const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

            const currentIndex = tabTriggers.value.findIndex(tab => tab.id === getFocusTab());

            if (currentIndex === -1) return;

            if (event.key === prevKey) {
                setPrevActiveTab();
                event.preventDefault();
            }

            if (event.key === nextKey) {
                setNextActiveTab();
                event.preventDefault();
            }
        }

        function enableListeners() {
            console.log(tabs.value);
            if (getFocusTab === '') {
                tabs.value.$el.addEventListener('keydown', handleKeyDown);
            }
        }

        function destroyListeners() {
            tabs.value.$el.removeEventListener('keydown', handleKeyDown);
        }

        onMounted(() => {
            wwLib.getFrontWindow().addEventListener('keydown', handleKeyDown);
        });
        // onUnmounted(() => {
        //     wwLib.getFrontWindow().removeEventListener('keydown', handleKeyDown);
        // });

        // Providing data and methods to child components
        provide('enableListeners', enableListeners);
        provide('destroyListeners', destroyListeners);
        provide(
            'activationMode',
            computed(() => props.content.activationMode)
        );
        provide('activeTabProvided', activeTab);
        provide(
            'loadAllTabs',
            computed(() => props.content.loadAllTabs)
        );
        provide('onBlurTab', tabName => {
            const tab = tabTriggers.value.find(tab => tab.id === tabName);
            if (tab) tab.focus = false;
        });
        provide('registerTabTrigger', (tabName, element) => {
            tabTriggers.value.push({ id: tabName, element, focus: false });
        });
        provide('setActiveTab', setActiveTab);
        provide('setFocusTab', setFocusTab);

        /* wwEditor:start */
        provide('hintUnregisterTabTrigger', tabName => {
            hintUnregisterTab(tabName);
        });
        provide('hintRegisterTabTrigger', tabName => {
            hintRegisterTab(tabName);
        });
        provide('hintRegisterTabContent', hintRegisterContent);
        provide('hintUnregisterTabContent', hintUnregisterContent);
        provide('hintChangeTabName', hintChangeTabName);
        provide('hintChangeContentName', hintChangeContentName);
        /* wwEditor:end */

        wwLib.wwElement.useRegisterElementLocalContext(
            'Tab',
            {},
            {
                goToNextTab: {
                    method: setNextActiveTab,
                    editor: {
                        label: 'Next',
                        elementName: 'Tab',
                        description: 'Go to the next tab',
                        icon: 'arrow-right',
                    },
                },
                goToPrevTab: {
                    method: setPrevActiveTab,
                    editor: {
                        label: 'Previous',
                        elementName: 'Tab',
                        description: 'Go to the previous tab',
                        icon: 'arrow-left',
                    },
                },
                goToTab: {
                    method: setActiveTab,
                    editor: {
                        label: 'Open tab',
                        elementName: 'Tab',
                        description: 'Go to specific tab',
                        icon: 'cursor-click',
                        args: [
                            {
                                name: 'Tab name',
                                type: 'any',
                                required: true,
                            },
                        ],
                    },
                },
            }
        );

        return {
            tabs,
            activeTab,
            setActiveTab,

            /* wwEditor:start */
            hintRegisterTab,
            hintUnregisterTab,
            hintRegisterContent,
            hintUnregisterContent,
            hintChangeTabName,
            hintChangeContentName,
            /* wwEditor:end */
        };
    },
};
</script>
