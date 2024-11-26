import { reactive, computed, watch, provide } from 'vue';

export default function useTabsHint(emit) {
    const state = reactive({
        registeredTabs: [],
        registeredContent: [],
    });

    function hintRegisterTab(id) {
        state.registeredTabs.push(id);
    }

    function hintUnregisterTab(id) {
        state.registeredTabs.splice(state.registeredTabs.indexOf(id), 1);
    }

    function hintChangeTabName(oldId, newId) {
        state.registeredTabs.splice(state.registeredTabs.indexOf(oldId), 1, newId);
    }

    function hintRegisterContent(id) {
        state.registeredContent.push(id);
    }

    function hintUnregisterContent(id) {
        state.registeredContent.splice(state.registeredContent.indexOf(id), 1);
    }

    function hintChangeContentName(oldId, newId) {
        state.registeredContent.splice(state.registeredContent.indexOf(oldId), 1, newId);
    }

    const missingTabOrField = computed(() => {
        // Check if there are any tab missing for the content
        const missingTabList = state.registeredContent.filter(content => !state.registeredTabs.includes(content));

        // Check if there are any content missing for the tab
        const missingFieldList = state.registeredTabs.filter(tab => !state.registeredContent.includes(tab));

        // Check if there are double tabs or content
        const doubleTabList = state.registeredTabs.filter((item, index) => state.registeredTabs.indexOf(item) !== index);
        const doubleContentList = state.registeredContent.filter((item, index) => state.registeredContent.indexOf(item) !== index);

        if (missingTabList.length || missingFieldList.length || doubleTabList.length || doubleContentList.length) {
            return {
                header: 'Tabs configuration issues :',
                text: `
                    ${missingTabList.length ? 'Missing Tab Trigger for some of your content<br>' : ''}
                    ${missingTabList.length ? `- ${missingTabList}<br>` : ''}
                    ${missingFieldList.length ? 'Missing Tab Content for some of your triggers<br>' : ''}
                    ${missingFieldList.length ? `- ${missingFieldList}<br>` : ''}
                    ${doubleTabList.length ? 'Double Tab Trigger names<br>' : ''}
                    ${doubleTabList.length ? `- ${doubleTabList}<br>` : ''}
                    ${doubleContentList.length ? 'Double Tab Content names<br>' : ''}
                    ${doubleContentList.length ? `- ${doubleContentList}<br>` : ''}
                `,
            };
        }

        return null;
    })

    watch(
        missingTabOrField,
        value => {
            emit('update:sidepanel-content', { path: 'missingTabOrField', value });
        },
        { immediate: true }
    );

    provide('_wwTabsMissingTabOrFieldObj', missingTabOrField);

    return { hintRegisterTab, hintUnregisterTab, hintChangeTabName, hintRegisterContent, hintUnregisterContent, hintChangeContentName };
}