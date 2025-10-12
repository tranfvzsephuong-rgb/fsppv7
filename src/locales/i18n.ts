import i18n, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTransition from './transitions/en.json'
import viTransition from './transitions/vn.json'
import afTransition from './transitions/af.json'
import asTransition from './transitions/as.json'
import azTransition from './transitions/az.json'
import beTransition from './transitions/be.json'
import bgTransition from './transitions/bg.json'
import caTransition from './transitions/ca.json'
import daTransition from './transitions/da.json'
import deTransition from './transitions/de.json'
import dvTransition from './transitions/dv.json'
import esTransition from './transitions/es.json'
import etTransition from './transitions/et.json'
import euTransition from './transitions/eu.json'
import filTransition from './transitions/fil.json'
import frTransition from './transitions/fr.json'
import hiTransition from './transitions/hi.json'
import huTransition from './transitions/hu.json'
import hyTransition from './transitions/hy.json'
import hrTransition from './transitions/hr.json'
import idTransition from './transitions/id.json'
import itTransition from './transitions/it.json'
import jpTransition from './transitions/jp.json'
import koTransition from './transitions/ko.json'
import loTransition from './transitions/lo.json'
import mlTransition from './transitions/ml.json'
import msTransition from './transitions/ms.json'
import ruTransition from './transitions/ru.json'
import thTransition from './transitions/th.json'
import tkTransition from './transitions/tk.json'
import ukTransition from './transitions/uk.json'
import uzTransition from './transitions/uz.json'
import cnTransition from './transitions/cn.json'
import ptTransition from './transitions/pt.json'
const i18nOptions: InitOptions = {
  resources: {
    af: {
      translations: afTransition
    },
    al: {
      translations: afTransition
    },
    dz: {
      translations: afTransition
    },
    ar: {
      translations: afTransition
    },
    au: {
      translations: enTransition
    },
    at: {
      translations: enTransition
    },
    br: {
      translations: ptTransition
    },
    kh: {
      translations: enTransition
    },
    cm: {
      translations: enTransition
    },
    cg: {
      translations: enTransition
    },
    as: {
      translations: asTransition
    },
    az: {
      translations: azTransition
    },
    vn: {
      translations: viTransition
    },
    en: {
      translations: enTransition
    },
    be: {
      translations: beTransition
    },
    bg: {
      translations: bgTransition
    },
    ca: {
      translations: caTransition
    },
    da: {
      translations: daTransition
    },
    de: {
      translations: deTransition
    },
    dv: {
      translations: dvTransition
    },
    es: {
      translations: esTransition
    },
    et: {
      translations: etTransition
    },
    eu: {
      translations: euTransition
    },
    fil: {
      translations: filTransition
    },
    fr: {
      translations: frTransition
    },
    hi: {
      translations: hiTransition
    },
    hr: {
      translations: hrTransition
    },
    hu: {
      translations: huTransition
    },
    hy: {
      translations: hyTransition
    },
    id: {
      translations: idTransition
    },
    it: {
      translations: itTransition
    },
    jp: {
      translations: jpTransition
    },
    ko: {
      translations: koTransition
    },
    lo: {
      translations: loTransition
    },
    ml: {
      translations: mlTransition
    },
    my: {
      translations: msTransition
    },
    bn: {
      translations: msTransition
    },
    ru: {
      translations: ruTransition
    },
    th: {
      translations: thTransition
    },
    tk: {
      translations: tkTransition
    },
    uk: {
      translations: ukTransition
    },
    uz: {
      translations: uzTransition
    },
    cn: {
      translations: cnTransition
    },
    tw: {
      translations: cnTransition
    },
    pt: {
      translations: ptTransition
    },
    ao: {
      translations: ptTransition
    },
    kr: {
      translations: koTransition
    },
    ua: {
      translations: ruTransition
    },
    za: {
      translations: enTransition
    },
    mc: { translations: enTransition },
    ph: {
      translations: enTransition
    },
    ro: {
      translations: enTransition
    },
    mo: {
      translations: cnTransition
    },
    mn: { translations: cnTransition },
    va: {
      translations: itTransition
    },
    sy: {
      translations: afTransition
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  ns: ['translations', 'errors', 'validations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  }
}

i18n.use(initReactI18next).init(i18nOptions)

export default i18n
