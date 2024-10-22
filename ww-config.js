export default {
    editor: {
        label: {
            en: 'Tabs',
        },
        icon: 'slider',         // 📛 TODO
        bubble: {
            icon: 'slider',     // 📛 TODO
        },
        customSettingsPropertiesOrder: [],
    },
    properties: {
        defaultActiveTab: {
            label: {
                en: 'Default active tab',
            },
            type: 'Text',
            defaultValue: 'tab1',
        },
        tabList: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'tab-list',
            }
        },
        // tabContentContainer: {
        //     hidden: true,
        //     defaultValue: {
        //         isWwObject: true,
        //         type: 'b783dc65-d528-4f74-8c14-e27c934c39b1', // Flex H
        //     }
        // },
        tabContentElements: {
            hidden: true,
            defaultValue: [
                {
                    isWwObject: true,
                    type: 'tab-content',
                    content: { name: 'tab1' },
                },
                {
                    isWwObject: true,
                    type: 'tab-content',
                    content: { name: 'tab2' },
                },
                {
                    isWwObject: true,
                    type: 'tab-content',
                    content: { name: 'tab3' },
                }
            ],
        },
    },
};
