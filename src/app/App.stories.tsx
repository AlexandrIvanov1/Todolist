import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxProviderDecorator";


export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App demo={true}/>

export const AppBaseExample = Template.bind({})
AppBaseExample.args = {}