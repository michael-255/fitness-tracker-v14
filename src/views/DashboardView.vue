<script setup lang="ts">
import { Measurement } from '@/models/Measurement'

/**
 * @todo
 * These should be compared as part of a test, but not break the component
 * Ensure they are the same length
 * Ensure they have the exact same keys
 *
 * Might want to make an Input component for each key?
 */
const measurementKeys = Measurement.keys()
const inputKeys = [
  'id',
  'createdAt',
  'name',
  'description',
  'status',
  'trackLbs',
  'trackInches',
  'trackFeet',
  'trackPercent',
]
</script>

<template>
  <h3>Dashboard</h3>

  <h5>Measurement: {{ inputKeys.length }}</h5>

  <div v-for="(value, index) in measurementKeys" :key="index">
    <div v-if="value == 'id'">Key: {{ value }}</div>
    <div v-if="value == 'createdAt'">Key: {{ value }}</div>
    <div v-if="value == 'name'">Key: {{ value }}</div>
    <div v-if="value == 'description'">Key: {{ value }}</div>
    <div v-if="value == 'status'">Key: {{ value }}</div>
    <div v-if="value == 'trackLbs'">Key: {{ value }}</div>
    <div v-if="value == 'trackInches'">Key: {{ value }}</div>
    <div v-if="value == 'trackFeet'">Key: {{ value }}</div>
    <div v-if="value == 'trackPercent'">Key: {{ value }}</div>
  </div>
</template>
