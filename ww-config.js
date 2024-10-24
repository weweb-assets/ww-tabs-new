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
        orientation: {
            label: {
                en: 'Orientation',
            },
            type: 'TextRadioGroup',
            options: {
                choices: [
                    { value: 'horizontal', label: { en: 'Horizontal', fr: 'Horizontal' } },
                    { value: 'vertical', label: { en: 'Vertical', fr: 'Vertical' } },
                ],
            },
            defaultValue: 'horizontal',
        },
        activationMode: {
            label: {
                en: 'Mode',
            },
            type: 'TextRadioGroup',
            options: {
                choices: [
                    { value: 'auto', label: { en: 'Auto', fr: 'Auto' } },
                    { value: 'manual', label: { en: 'Manual', fr: 'Manuel' } },
                ],
            },
            defaultValue: 'auto',
        },
        defaultActiveTab: {
            label: {
                en: 'Default value',
            },
            type: 'Text',
            options: {
                nullable: true
            },
            bindable: true,
            responsive: true,
            states: true,
            defaultValue: '',
        },
        loadAllTabs: {
            label: {
                en: 'Load all tabs',
            },
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
            responsive: true,
        },
        tabContent: {
            hidden: true,
            defaultValue: []
        },
    },
};
