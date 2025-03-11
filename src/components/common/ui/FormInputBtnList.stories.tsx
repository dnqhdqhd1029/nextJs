/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormInputBtn from './FormInputBtn'
import FormInputBtnList from './FormInputBtnList'

const meta: Meta<typeof FormInputBtnList> = {
  title: '0.UI/FormInputBtnList',
  component: FormInputBtnList,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormInputBtnList>

export const Default: Story = {
  args: {
    type: 'checkbox',
    name: 'checkbox',
    children: [
      <FormInputBtn
        key="1"
        label="그룹 체크박스 버튼1"
        id="group-checkbox-item1"
      />,
      <FormInputBtn
        key="2"
        label="그룹 체크박스 버튼2"
        id="group-checkbox-item2"
      />,
      <FormInputBtn
        key="3"
        label="그룹 체크박스 버튼3"
        id="group-checkbox-item3"
      />,
    ],
  },
}

export const Radio: Story = {
  args: {
    type: 'radio',
    name: 'radio',
    children: [
      <FormInputBtn
        key="4"
        label="그룹 체크박스 버튼1"
        id="group-radio1-item1"
      />,
      <FormInputBtn
        key="5"
        label="그룹 체크박스 버튼2"
        id="group-radio1-item2"
      />,
      <FormInputBtn
        key="6"
        label="그룹 체크박스 버튼3"
        id="group-radio1-item3"
      />,
    ],
  },
}

export default meta
