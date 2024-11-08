export default {
    editor: {
        label: {
            en: 'Tabs',
        },
        icon: 'tabs',
        bubble: {
            icon: 'tabs',
        },
        customSettingsPropertiesOrder: [],
        hint: (_, sidepanelContent) => {
            if (sidepanelContent.missingTabOrField) {
                return {
                    type: 'warning',
                    header: sidepanelContent.missingTabOrField.header,
                    text: sidepanelContent.missingTabOrField.text,
                };
            }
        },
    },
    actions: [
        {
            label: 'Open a tab',
            action: 'setActiveTab',
            args: [
                {
                    name: 'tabName',
                    type: 'Text',
                },
            ],
        },
    ],
    inherit: {
        type: "ww-layout",
    },
    options: {
        autoByContent: true,
        displayAllowedValues: ["flex", "grid"],
    },
    triggerEvents: [
        {
            name: 'onValueChanged',
            label: {
                en: 'On value changed',
            },
            event: {
                newValue: '',
                oldValue: '',
            },
        },
    ],
    actions: [
        {
            label: 'Set active tab',
            action: 'setActiveTab',
            args: [
                {
                    name: 'Tab name',
                    type: 'Text',
                },
            ],
        },
    ],
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
            propertyHelp: {
                tooltip: "Whether the tabs should be navigated using the horizontal or vertical arrow keys.",
            },
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
            propertyHelp: {
                tooltip: "If set to `Auto`, the tabs will be activated when the corresponding trigger is focused by navigating with `Tab`, arrow keys or otherwise.",
            },
        },
        defaultActiveTab: {
            label: {
                en: 'Initial value',
            },
            type: 'Text',
            options: {
                nullable: true,
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
            propertyHelp: {
                tooltip: "If set to `true`, all tabs will be loaded when the page loads instead of loading each one when it's set to active.",
            },
        },
        tabContent: {
            hidden: true,
            defaultValue: [],
        },
        /* wwEditor:start */
        missingTabOrField: {
            hidden: true,
            defaultValue: false,
            editorOnly: true,
        },
        /* wwEditor:end */
    },
};
