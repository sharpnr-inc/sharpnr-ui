import type { Meta, StoryObj } from "@storybook/react";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./button-group";
import { Button } from "./button";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Cut</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">-</Button>
      <ButtonGroupText>100%</ButtonGroupText>
      <Button variant="outline">+</Button>
    </ButtonGroup>
  ),
};

export const WithVariants: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="default">Save</Button>
      <ButtonGroupSeparator />
      <Button variant="destructive">Delete</Button>
    </ButtonGroup>
  ),
};
