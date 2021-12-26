import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Logo from "./Logo";

export default { component: Logo } as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;
export const Default = Template.bind({});
