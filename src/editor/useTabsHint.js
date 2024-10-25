import { reactive, computed, watch, provide } from 'vue';

export default function useTabsHint(emit) {
    const state = reactive({
        registeredTabs: [],
        registeredContent: [],
    });

    function registerTab(id) {
        state.registeredTabs.push(id);
        console.log('func registerTab', state.registeredTabs);
    }

    function unregisterTab(id) {
        state.registeredTabs.splice(state.registeredTabs.indexOf(id), 1);
        console.log('func unregisterTab', state.registeredTabs);
    }

    function changeTabName(oldId, newId) {
        state.registeredTabs.splice(state.registeredTabs.indexOf(oldId), 1, newId);
        console.log('func changeTabName', state.registeredTabs);
    }

    function registerContent(id) {
        state.registeredContent.push(id);
        console.log('func registerContent', state.registeredContent);
    }

    function unregisterContent(id) {
        state.registeredContent.splice(state.registeredContent.indexOf(id), 1);
        console.log('func unregisterContent', state.registeredContent);
    }

    function changeContentName(oldId, newId) {
        state.registeredContent.splice(state.registeredContent.indexOf(oldId), 1, newId);
        console.log('func changeContentName', state.registeredContent);
    }

    const missingTabOrField = computed(() => {
        console.log('missingTabOrField', state.registeredTabs, state.registeredContent);
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

    return { registerTab, unregisterTab, registerContent, unregisterContent, changeTabName, changeContentName };
}