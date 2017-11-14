<template>
  <md-whiteframe md-elevation="5" class="md-connector-form content-panel white-content-panel">
    <form novalidate @submit.prevent="validateForm">
      <md-layout md-column>
        <md-layout md-align="start" md-vertical-align="top">
          <!-- Nom -->
          <label class="md-input-label">Nom</label>
          <md-input-container :class="{ 'md-input-invalid': errors.has('name') }">
            <md-input
              name="name"
              type="text"
              placeholder="Connecteur ouverture de compte"
              v-es-input
              v-model="model.name"
              v-validate="'required'"
              data-vv-as="Nom">
            </md-input>
            <span class="md-error">{{ errors.first('name') }}</span>
          </md-input-container>
          <!-- Logo -->
          <label class="md-input-label">Logo</label>
          <md-input-container :class="{ 'md-input-invalid': errors.has('logo') }">
            <md-file
              name="logo"
              placeholder="nom_logo.jpeg"
              v-es-input-file="'Importer'"
              v-model="model.logo.filename"
              @selected="onFileSelect($event)">
            </md-file>
          </md-input-container>
          <!-- Message utilisateur -->
          <label class="md-input-label">Message utilisateur</label>
          <md-input-container :class="{ 'md-input-invalid': errors.has('introduction_text') }">
            <md-textarea
              name="introduction_text"
              maxlength="160"
              placeholder="Dans le cadre de votre démarche de souscription, merci de nous transmettre les pièces justificatives demandées."
              v-es-input
              v-model="model.introduction_text"
              data-vv-as="Message utilisateur">
            </md-textarea>
            <span class="md-error">{{ errors.first('introduction_text') }}</span>
          </md-input-container>
          <!-- Bouton "Enregistrer" -->
          <md-layout md-row>
            <md-layout md-align="center" md-vertical-align="top">
              <md-button
                type="submit"
                class="md-form-button"
                @click="saveConnector($event)">
              {{ saveButtonLabel }}
              </md-button>
            </md-layout>
          </md-layout>
        </md-layout>
      </md-layout>
    </form>
  </md-whiteframe>
</template>

<script>
import { esFileReader } from '../services/esFileReader'

export default {
  name: 'md-connector-form',
  props: {
    model: {
      type: Object,
      required: true
    },
    saveButtonLabel: {
      type: String,
      required: true
    }
  },
  data: () => ({ }),
  methods: {
    onFileSelect (event) {
      esFileReader
        .getBase64(event[0])
        .then(response => {
          this.model.logo = {
            filename: event[0].name,
            mimeType: event[0].type,
            content: response
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveConnector (event) {
      var vm = this
      vm.validateForm(function () {
        var connector = {
          name: vm.model.name,
          introduction_text: vm.model.introduction_text,
          logo: {
            filename: vm.model.logo.filename,
            mimeType: vm.model.logo.mimeType,
            content: vm.model.logo.content
          }
        }
        vm.$emit('saveConnector', connector)
      })
    },
    validateForm (callback) {
      this.$validator.validateAll().then((result) => {
        if (result && typeof (callback) === 'function') {
          console.log('mdConnectorForm::validateForm::success')
          callback()
        }
        console.log('mdConnectorForm::validateForm::failure')
        return
      })
    }
  }
}
</script>

<style>
.md-connector-form {
  margin: 45px 30px 45px 30px;
  padding: 30px 60px 30px 54px;
  min-width: 683px;
  max-width: 683px;
  width: 683px;
}
</style>
