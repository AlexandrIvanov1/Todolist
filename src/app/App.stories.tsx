import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./ReduxProviderDecorator";
import {withRouter} from 'storybook-addon-react-router-v6';


export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, withRouter]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App demo={true}/>

export const AppBaseExample = Template.bind({})
AppBaseExample.args = {}