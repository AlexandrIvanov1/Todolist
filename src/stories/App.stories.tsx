import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "./ReduxProviderDecorator";


export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App />

export const AppBaseExample = Template.bind({})
AppBaseExample.args = {}