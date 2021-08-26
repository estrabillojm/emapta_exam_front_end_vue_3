import { mount, shallowMount } from '@vue/test-utils'
import Button from '@/components/reusable/Button.vue'
import Icon from '@/components/reusable/Icon.vue'
import Layout from '@/components/reusable/Layout.vue'
import Card from '@/components/reusable/Card.vue'

describe('Checking Buttons', () => {
  it('renders when props is passed through the button', () => {
    const btnName = 'buttonName'
    const wrapper = shallowMount(Button, {
      props: { btnName }
    })
    expect(wrapper.text()).toMatch(btnName)
  })
})

describe('Checking Icons', () => {
  it('renders when props is passed through the Icons', () => {
    const iconName = 'IconName'
    const wrapper = shallowMount(Icon, {
      props: { iconName }
    })
    expect(wrapper.text()).toMatch(iconName)
  })
})


test('Check Layout if the slots has a content', () => {
  const wrapper = mount(Layout, {
    slots: {
      'form-modal': '<div>form</div>',
      'nav-content': '<div>nav-content</div>',
      'values-content': '<div>values-content</div>',
      'principles-content': '<div>principles-content</div>'
    }
  })
  expect(wrapper.html()).toContain('<div>form</div>')
  expect(wrapper.html()).toContain('<div>nav-content</div>')
  expect(wrapper.html()).toContain('<div>values-content</div>')
  expect(wrapper.html()).toContain('<div>principles-content</div>')
})


test('Check Cards if the slots has a content', () => {
  const wrapper = mount(Card, {
    slots: {
      'card-content': '<div>card-content</div>'
    }
  })
  expect(wrapper.html()).toContain('<div>card-content</div>')
})


  