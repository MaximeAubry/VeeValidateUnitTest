/* plugins for unit tests */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

/* VueJs app modules */
/* import Vue from 'vue' */
import { auth } from '../../../src/auth/authService'
import { createLocalVue, mount } from 'vue-test-utils'
import VeeValidate from 'vee-validate'
import flushPromises from 'flush-promises'
import ConnectorNew from '@/components/ConnectorNew.vue'

const localVue = createLocalVue()
localVue.use(VeeValidate)

describe('ConnectorNew.vue', () => {
  var authMock = null
  var mockApi = null

  beforeEach(() => {
    authMock = sinon.mock(auth)
    authMock.expects('isAuthenticated').returns(true)
    mockApi = new MockAdapter(axios)
  })

  afterEach(() => {
    authMock.restore()
    mockApi.restore()
  })

  it('vue should unvalidate form', async () => {
    const wrapper = mount(ConnectorNew, { localVue })
    let input = wrapper.find('input[type=text][name=name]')

    wrapper.vm.connector.name = null
    wrapper.vm.connector.introduction_text = null
    wrapper.vm.connector.logo.filename = null
    wrapper.vm.connector.logo.mimeType = null
    wrapper.vm.connector.logo.content = null

    console.log(wrapper.vm.errors.all())
    input.trigger('input')
    await flushPromises()
    console.log(wrapper.vm.errors.all())
  })
})
