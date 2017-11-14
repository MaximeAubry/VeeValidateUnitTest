<template>
  <md-layout md-row class="connector-new">
    <md-layout md-column class="connector-explanation-panel">
      
    </md-layout>
    <md-layout md-column class="connector-form-panel">
      <md-connector-form
        ref="connector-form"
        :model="connector"
        :save-button-label="'Enregistrer'"
        @saveConnector="saveConnector">
      </md-connector-form>
    </md-layout>
  </md-layout>
</template>

<script>
import mdConnectorForm from './mdConnectorForm.vue'
import { api } from '../api/backendApi'

export default {
  name: 'connector-new',
  components: { mdConnectorForm },
  data: () => ({
    connector: {
      name: null,
      introduction_text: null,
      logo: {
        filename: null,
        mimeType: null,
        content: null
      }
    }
  }),
  methods: {
    saveConnector: function (connector) {
      api.$ConnectorCtrl.post(connector)
    }
  }
}
</script>

<style>
.connector-new {

}
</style>
